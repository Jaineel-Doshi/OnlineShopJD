from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from django.contrib.auth.models import User


# project
from base.models import Product, Review
from base.products import products
from base.serializers import ProductSerializer


from rest_framework import status


@api_view(["GET"])
def getProducts(request):
    # query for search functionality
    query = request.query_params.get("keyword")
    # print("query:", query)
    if query == None:
        query = ""
    products = Product.objects.filter(name__icontains=query).order_by("-createdAt")
    # products = Product.objects.all() -> products not filtered by query

    page = request.query_params.get("page")

    # Int represents number of products per page
    itemsPerPage = 3
    paginator = Paginator(products, itemsPerPage)

    try:
        products = paginator.page(page)
    # return first page if int not provided
    except PageNotAnInteger:
        products = paginator.page(1)
    # return last page if int is above last page's number
    except EmptyPage:
        products = paginator.page(paginator.num_pages)

    if page == None:
        page = 1

    page = int(page)

    serializer = ProductSerializer(products, many=True)
    print("numpages:", paginator.num_pages)
    # return Response(serializer.data) -> adjusted below for paginator
    return Response(
        {"products": serializer.data, "page": page, "pages": paginator.num_pages}
    )


@api_view(["GET"])
def getTopProducts(requests):
    # Filter greater than or equal to 4 star; order max first
    products = Product.objects.filter(rating__gte=4).order_by("-rating")[0:5]
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)

    # Test code
    # product = None
    # for i in products:
    #     if i["_id"] == pk:
    #         product = i
    #         break
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    user = request.user
    product = Product.objects.get(_id=pk)
    data = request.data

    # (1) Review already exists
    alreadyExists = product.review_set.filter(user=user).exists()

    if alreadyExists:
        content = {"detail": "Product already reviewed"}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # (2) No rating or 0
    elif data["rating"] == 0:
        content = {"detail" "Please select a rating"}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # (3) Create Review
    else:
        review = Review.objects.create(
            user=user,
            product=product,
            name=user.first_name,
            rating=data["rating"],
            comment=data["comment"],
        )

        # queries all and then takes length -> cached result used in for loop
        reviews = product.review_set.all()
        product.numReviews = len(reviews)

        # reviews = product.review.count() -> ineffecient to use count and then query all

        total = 0
        for i in reviews:
            total += i.rating

        product.rating = total / len(reviews)
        product.save()

        return Response("Review Added")

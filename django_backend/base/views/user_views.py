from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from django.contrib.auth.models import User

# Hashes password
from django.contrib.auth.hashers import make_password

# project
from base.serializers import ProductSerializer, UserSerializer, UserSerializerWithToken

# rest
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    # customizing encoded value for jwt
    # @classmethod
    # def get_token(cls, user):
    #     token = super().get_token(user)

    #     # Add custom claims
    #     token["username"] = user.username
    #     token["message"] = "hello world"

    #     return token

    def validate(self, attrs):
        data = super().validate(attrs)

        # data["username"] = self.user.username
        # data["email"] = self.user.email

        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# Test routes
@api_view(["GET"])
def getRoutes(request):
    routes = [
        "/api/products/",
        "/api/products/create",
        "/api/products/upload",
        "/api/products/<id>/reviews/",
        "/api/products/top",
        "/api/products/<id>",
        "/api/products/delete/<id>/",
        "/api/products/<update>/<id>/",
    ]
    return Response(routes)


@api_view(["POST"])
def registerUser(request):
    data = request.data
    # print("DATA:", data)
    try:
        user = User.objects.create(
            first_name=data["name"],
            username=data["email"],
            email=data["email"],
            password=make_password(data["password"]),
        )
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        message = {"detail": "User with this email already exists."}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user
    # user serializer w/ token to update user
    serializer = UserSerializerWithToken(user, many=False)
    data = request.data

    user.first_name = data["name"]
    user.username = data["email"]
    user.email = data["email"]
    # reset password if provided
    if data["password"] != "":
        user.password = make_password(data["password"])
    user.save()
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

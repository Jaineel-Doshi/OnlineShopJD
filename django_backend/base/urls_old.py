from django.urls import path
from . import views

# from rest_framework_simplejwt.views import (
#     TokenObtainPairView,
#     # TokenRefreshView,
# )

urlpatterns = [
    path(
        "users/login", views.MyTokenObtainPairView.as_view(), name="token_obtain_pair"
    ),
    path("users/register/", views.registerUser, name="register"),
    # path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # path("", views.getRoutes, name="routes"),
    path("users/profile/", views.getUserProfile, name="users-profile"),
    path("users/", views.getUsers, name="userse"),
    path("products/", views.getProducts, name="products"),
    path("products/<str:pk>/", views.getProduct, name="product"),
]

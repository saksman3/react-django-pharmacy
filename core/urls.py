from django.urls import path, re_path,include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token

from .views import (ItemView,
CategoryView,
UserProfileView,
UserProfileUpdate,
ProfileImageUpdate,
OrderView
)

route = DefaultRouter()
route.register('categories',CategoryView,basename="categories")
route.register('orders',OrderView,basename="categories")
urlpatterns = [
    path('profile/', UserProfileView.as_view(), name="profile"),
    path('profile_image_update/', ProfileImageUpdate.as_view(), name="update_image"),
    path('update_profile/',UserProfileUpdate.as_view(), name="update-profile"),
    path('products/', ItemView.as_view(), name='products'),
    path('products/<int:id>/',ItemView.as_view(), name="product-detail"),
    path('',include(route.urls)),
    path('api-auth/', include('rest_framework.urls')),
    path('login/', obtain_auth_token),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
] 

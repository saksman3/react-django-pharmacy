
from unicodedata import category
from urllib import response
from django.shortcuts import get_object_or_404, render
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework import serializers
from .serializers import ItemSerializer, OrderItemSerializer, CategorySerializer, OrderSerializer, UserProfile, UserProfileSerializer
# Create your views here., User
from rest_framework import mixins, viewsets, views
from rest_framework.response import Response
from rest_framework.generics import (
    RetrieveUpdateDestroyAPIView,
    ListCreateAPIView,
    ListAPIView,
    GenericAPIView
)

from .models import (
    Category,
    Item,
    OrderItem,
    Order,
    OrderStatus,
    UserProfile
)

from django.contrib.auth.models import User


class CategoryView(viewsets.ViewSet):

    permission_classes = (AllowAny,)

    def list(self, request):
        queryset = Category.objects.all()
        serializer = CategorySerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        query = Category.objects.get(id=pk)
        serializer = CategorySerializer(query)
        serializers_data = serializer.data
        all_data = []
        category_items = Item.objects.filter(
            category_id=serializers_data['id'])
        categroy_items_serializer = ItemSerializer(category_items, many=True)
        serializers_data['category_items'] = categroy_items_serializer.data
        all_data.append(serializers_data)
        return Response(all_data)


class ItemView(GenericAPIView, mixins.ListModelMixin, mixins.RetrieveModelMixin):
    permission_classes = (AllowAny,)
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    lookup_field = "id"

    def get(self, request, id=None):
        if id:
            return self.retrieve(request)
        else:
            return self.list(request)


class ItemDetailView(RetrieveUpdateDestroyAPIView):
    permission_classes = (AllowAny,)
    queryset = Item.objects.all()
    serializer_class = ItemSerializer


class UserProfileView(views.APIView):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def get(self, request):
        try:
            print(request.user)
            queryset = UserProfile.objects.get(user=request.user)
            serializers = UserProfileSerializer(queryset)
            print(serializers.data)
            response_msg = {"error": False, "data": serializers.data}
        except:
            response_msg = {'error': True,
                            "message": "Incorrect user details, Try Again"}
        return Response(response_msg)


class UserProfileUpdate(views.APIView):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def post(self, request):
        try:

            user = request.user
            data = request.data
            
            user_obj=User.objects.get(username=user)
            print(user_obj)
            user_obj.first_name = data['first_name']
            user_obj.last_name = data['last_name']
            user_obj.email = data['email']
            user_obj.save()
            print(user_obj)
            response_msg = {'Message': 'User Updated!'}
        except:
            response_msg = {"Failed to update user!"}
        return Response(response_msg)

class ProfileImageUpdate(views.APIView):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def post(self,request):
        try:
            user = request.user
            print(user)
            query = UserProfile.objects.get(user=user)
            data = request.data
            
            serializers = UserProfileSerializer(query, data=data,context={"request":request} )
            serializers.is_valid(raise_exception=True)
            serializers.save()
            response_msg = {"error":False, "message":"Image uploaded"}
            return Response(response_msg)
        except:
            return Response({"error":True, "message":"Unable to upload image"})



def add_to_cart(request, pk):
    item = get_object_or_404(Item, pk=pk)
    order_item = OrderItem.objects.create(item=item)
    order_qs = Order.objects.filter(user=request.user, ordered=False)
    if order_qs.exists():
        order = order_qs[0]
        if order.items.filter(item__pk=item.pk).exists():
            order_item.quantity += 1
            order_item.save()
    else:
        order = Order.objects.create(user=request.user)
        order.items.add(order_item)

""" class MyCart(viewsets.views):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]     """

""" class RegisterView(views.APIView):
    def post(self,request):
        serializers = UserProfileSerializer(data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response({"error":False,"message":f"user is created for '{serializers.data['username']}' ","data":serializers.data})
        return Response({"error":True,"message":"A user with that username already exists! Try Anather Username"}) """

class OrderView(viewsets.ViewSet):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]   
    def list(self, request):
        query = Order.objects.filter(user=request.user.userprofile)
        serializers = OrderSerializer(query, many=True)
        all_data = []
        for order in serializers.data: 
            ## loop through all available orders and collect order items into all data array
            order_item_for_this_order = OrderItem.objects.filter(order=order['id'])
            order_item_Serializer = OrderItemSerializer(order_item_for_this_order, many=True) # get all orders filtered serialized
            order['order_items'] = order_item_Serializer.data    # create order items into current order object
            all_data.append(order) # append current updated object into the all data array.
        return Response(all_data)
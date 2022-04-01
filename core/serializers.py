from urllib import response
from django.contrib.auth import get_user_model
from .models import (
    Item,
    OrderItem,
    Order,
    OrderStatus,
    Category,
    UserProfile
)
from rest_framework.serializers import ModelSerializer, SerializerMethodField

User = get_user_model()
class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username','password','first_name','last_name','email')
        extra_kwargs = {"password":{"write_only":True,'required':True}}

class UserProfileSerializer(ModelSerializer):
    class Meta:
        model = UserProfile
        fields = "__all__"
        read_only_fields = ['user']
    def validate(self, attrs):
        attrs['user'] = self.context['request'].user
        return attrs
    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['user'] = UserSerializer(instance.user).data
        return response

class CategorySerializer(ModelSerializer):
    class Meta:
        model=Category
        fields = '__all__'
        

class ItemSerializer(ModelSerializer):
    # category = SerializerMethodField()

    class Meta:
        model=Item
        fields = ('__all__')
        depth=1
        """ depth = 1 """
    """     def get_category(self,obj):
            return obj.get_category_display() """
 



class OrderSerializer(ModelSerializer):
    class Meta:
        model= Order
        fields = "__all__"

class OrderItemSerializer(ModelSerializer):
    class Meta:
        model = OrderItem
        fields = "__all__"
        depth = 1  #set depth to 1 to get detailed info for related items. ie. foreign keys.
from django.contrib import admin

# Register your models here.
from .models import (Item,
Order,
OrderItem,
OrderStatus,
UserProfile,
Category)

admin.site.register(UserProfile)
admin.site.register(Item)
admin.site.register(OrderStatus)
admin.site.register(OrderItem)
admin.site.register(Order)
admin.site.register(Category)
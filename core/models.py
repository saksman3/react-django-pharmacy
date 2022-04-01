from statistics import mode
from tkinter import CASCADE
from django.db import models
from django.conf import settings
from django.contrib.auth.models import User
# Create your models here.

"""    stripe_customer_id = models.CharField(max_length=50, blank=True, null=True)
    one_click_purchasing = models.BooleanField(default=False) """

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(blank=True, null=True)
    def __str__(self):
        return self.user.username


CATEGORY_CHOICES = (
    ('Pain', 'Pain'),
    ('Flue', 'Flue'),
    ('Allergy and Immunology', 'Allergy and Immunology'),
    ('Anesthesiology', 'Anesthesiology'),
    ('Dermatology', 'Dermatology'),
    ('Internal medicine', 'Internal medicine'),
    ('Medical genetics', 'Medical genetics'),
)


class Category(models.Model):
    name = models.CharField(max_length=250, choices=CATEGORY_CHOICES)
    def __str__(self):
        return self.name
class Item(models.Model):
    title = models.CharField(max_length=250)
    price = models.FloatField()
    discount_price = models.FloatField(blank=True, null=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, blank=True, null=True)
    description = models.TextField()
    image = models.ImageField()

    def __str__(self):
        return self.title

"""    def get_absolute_url(self):
        return reverse("core:product", kwargs={
            'pk': self.id
        })"""

class Order(models.Model): 
    #order/cart
    user = models.ForeignKey(UserProfile,
                             on_delete=models.CASCADE)
    start_date = models.DateTimeField(auto_now_add=True)
    complete = models.BooleanField(default=False)
    total = models.PositiveIntegerField()
    def __str__(self):
        return f"{self.id} - {self.user} -  {self.total} items"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    subtotal = models.FloatField()

    def __str__(self):
        return f"{self.order.id} - {self.item.title} - {self.quantity} - R{self.subtotal}"
ORDER_STATUSES = (
    ("OR", "Order Received"),
    ("OP", "Order Processing"),
    ("OTW", "On the way"),
    ("OC", "Order Completed"),
    ("C", "Cancelled"),
)
class OrderStatus(models.Model):
    order  = models.OneToOneField(Order,on_delete=models.CASCADE)
    address = models.CharField(max_length=255)
    mobile = models.CharField(max_length=16)
    email = models.CharField(max_length=200)
    total = models.FloatField()
    discount = models.FloatField()
    order_status = models.CharField(max_length=100,choices=ORDER_STATUSES,default="Order Received")
    date = models.DateField(auto_now_add=True)
    payment_complete = models.BooleanField(default=False,blank=True, null=True)  

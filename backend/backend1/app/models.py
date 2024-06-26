from django.contrib.auth.models import AbstractUser, PermissionsMixin
from django.db import models
from django.utils.translation import gettext_lazy as _

from .managers import CustomUserManager

class CustomUser(AbstractUser):
    email = models.EmailField(_("email address"), unique=True)
    username = models.CharField(max_length=100)
    birthdate = models.DateField(null=True)  
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self) -> str:
        return self.email

class Category(models.Model):
    category_name = models.CharField(max_length=100)

    def __str__(self):
        return self.category_name

class Product(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    product_name = models.CharField(max_length=100)
    description = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    stock_small_size = models.IntegerField(default=0)
    stock_medium_size = models.IntegerField(default=0)
    stock_large_size = models.IntegerField(default=0)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='images/', blank=True, null=True,)

    def __str__(self):
        return self.product_name

class Cart(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)


    def __str__(self):
        return f"{self.product.product_name}"

class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    review = models.TextField(max_length=255)
    variation = models.TextField(max_length=255)
    productQuality = models.TextField(max_length=255)
    performance = models.TextField(max_length=255)
    bestFeatures = models.TextField(max_length=255)

    def __str__(self):
        return f"Review by {self.user.username} for {self.product.product_name}"
    
class Ewallet(models.Model):
    name = models.TextField(max_length=255)
    balance  = models.IntegerField()

    def __str__(self):
        return f'{self.name} - {self.balance}'   
    
class Order(models.Model):
    cart = models.ManyToManyField(Cart, through='Checkout')
    buyer = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    address = models.CharField(max_length=255)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)


class Checkout(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)

    # def __str__(self):
    #     return f'{self.cart..id} - {self.order.id}'



    

    


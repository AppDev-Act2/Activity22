from django.db import models

# Create your models here.
class Customer(models.Model):
    firstname = models.CharField(max_length=255)
    lastname = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    address = models.TextField()
    phoneno = models.IntegerField()

class Seller(models.Model):
    sellername = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    phoneno = models.IntegerField()

class Store(models.Model):
    seller = models.ForeignKey(Seller, on_delete=models.CASCADE)
    storename = models.CharField(max_length=255)
    location = models.TextField()

class Product(models.Model):
    store = models.ForeignKey(Store, on_delete=models.CASCADE)
    productname = models.CharField(max_length=255)
    description = models.TextField()
    category = models.CharField(max_length=255)
    price = models.IntegerField()
    stock = models.IntegerField()

class Order(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    orderdate = models.DateField()
    total = models.IntegerField()
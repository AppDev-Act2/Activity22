from django.shortcuts import render
from app.serializers import ProductSerializer, StoreSerializer, CategorySerializer
from app.models import Product, Store, Category
from rest_framework.generics import ListCreateAPIView, RetrieveAPIView, ListAPIView


# Create your views here.

class ProductListApiView(ListCreateAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()

    def perform_create(self, serializer):
        serializer.save()

class ProductDetailApiView(RetrieveAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()        

class StoreListApiView(ListCreateAPIView):
    serializer_class = StoreSerializer
    queryset = Store.objects.all()

    def perform_create(self, serializer):
        serializer.save()

class CategoryListApiView(ListCreateAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()

    def perform_create(self, serializer):
        serializer.save()

class CategoryDetailApiView(RetrieveAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()           


class ProductListByCategory(ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        category_name = self.kwargs['category']
        return Product.objects.filter(category__category=category_name)

from django.shortcuts import render
from app.serializers import ProductSerializer, StoreSerializer
from app.models import Product, Store
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView


# Create your views here.

class ProductListApiView(ListCreateAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()

    def perform_create(self, serializer):
        serializer.save()

class StoreListApiView(ListCreateAPIView):
    serializer_class = StoreSerializer
    queryset = Store.objects.all()

    def perform_create(self, serializer):
        serializer.save()
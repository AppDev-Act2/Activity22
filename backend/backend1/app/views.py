from rest_framework import status  # Add this import
from rest_framework.decorators import api_view, permission_classes
from django.views.decorators.http import require_POST
from rest_framework.response import Response
from .models import Product, Category, Cart, Review, Ewallet
from .serializers import ProductSerializer, CategorySerializer, CartSerializer, CheckoutSerializer, OrderSerializer

from rest_framework.renderers import JSONRenderer
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
from .serializers import CustomUserSerializer, ReviewSerializer, EwalletSerializer
from rest_framework.views import APIView
from .models import Cart, Checkout, Order, Ewallet
from rest_framework import generics, permissions



class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ProductListCreateView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class CartListCreateView(generics.ListCreateAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer

class CartDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer

class ReviewListCreateView(generics.ListCreateAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

class ReviewDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

class EwalletListCreateView(generics.ListCreateAPIView):
    queryset = Ewallet.objects.all()
    serializer_class = EwalletSerializer

class EwalletDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Ewallet.objects.all()
    serializer_class = EwalletSerializer

class CheckoutListCreateView(generics.ListCreateAPIView):
    queryset = Checkout.objects.all()
    serializer_class = CheckoutSerializer

class CheckoutDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Checkout.objects.all()
    serializer_class = CheckoutSerializer

class OrderListCreateView(generics.ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

class OrderDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


class ProductsByCategoryView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        category_id = self.kwargs['category_id']
        return Product.objects.filter(category_id=category_id)
    
class SellerOrderListView(generics.ListAPIView):
    serializer_class = OrderSerializer

    def get_queryset(self):
        # Get the current seller
        current_seller = self.request.user
        # Filter orders based on products sold by the current seller
        return Order.objects.filter(cart__product__user=current_seller)
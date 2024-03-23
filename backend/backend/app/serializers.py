from rest_framework import serializers
from app.models import Product, Store, Category
# from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class StoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'                

# class UserCreateSerializer(BaseUserCreateSerializer):
#     class Meta(BaseUserCreateSerializer.Meta):
#         fields = ['id', 'username', 'email', 'password', 'first_name', 'last_name']
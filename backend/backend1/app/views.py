from rest_framework import status  # Add this import
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import Product, Category, Cart
from .serializers import ProductSerializer, CategorySerializer, CartSerializer
from rest_framework.renderers import JSONRenderer
from rest_framework.permissions import IsAuthenticated


@api_view(['POST'])
def add_product(request):
    if request.method == 'POST':
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)  # Update status variable
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  # Update status variable

@api_view(['GET'])
def user_products(request, user_id):
    if request.method == 'GET':
        products = Product.objects.filter(user_id=user_id)
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
    
@api_view(['GET'])
def get_categories(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_all_products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_product_by_id(request, product_id):
    try:
        product = Product.objects.get(id=product_id)
        serializer = ProductSerializer(product)
        return Response(serializer.data)
    except Product.DoesNotExist:
        return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_cart(request):
    if request.method == 'POST':
        user = request.user
        product_id = request.data.get('product_id')
        try:
            product = Product.objects.get(id=product_id)
            cart_item, created = Cart.objects.get_or_create(user=user, product=product)
            if created:
                return Response({"message": "Product added to cart successfully"}, status=status.HTTP_201_CREATED)
            else:
                return Response({"message": "Product already exists in cart"}, status=status.HTTP_200_OK)
        except Product.DoesNotExist:
            return Response({"error": "Product does not exist"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_cart(request):
    if request.method == 'GET':
        user = request.user
        cart_items = Cart.objects.filter(user=user)
        serializer = CartSerializer(cart_items, many=True)
        return Response(serializer.data)
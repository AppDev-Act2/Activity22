from django.contrib import admin
from django.urls import path, include
from app.views import add_product, user_products, get_categories, get_all_products, get_product_by_id, add_to_cart, view_cart


urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.authtoken')),

    #for adding of products
    path('add_product/', add_product, name='add_product'),

    #products by user(seller)
    path('user_products/<int:user_id>/', user_products, name='user_products'),


    path('categories/', get_categories, name='categories'),

    #tanan products para makita ni customer
    path('products/', get_all_products, name='get_all_products'),

    path('products/<int:product_id>/', get_product_by_id, name='get_product_by_id'),


    path('cart/add/', add_to_cart, name='add_to_cart'),
    path('cart/<int:user_id>/', view_cart, name='view_cart'),
]
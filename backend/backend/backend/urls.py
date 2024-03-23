"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from app.views import ProductListApiView, ProductListApiViews, StoreListApiView, ProductDetailApiView, CategoryListApiView, CategoryDetailApiView, ProductListByCategory

urlpatterns = [
    path('admin/', admin.site.urls),
    path('products/', ProductListApiView.as_view(), name = 'product-list-view'),
    path('productsss/', ProductListApiViews.as_view(), name = 'product-list-view'),
    path('products/<int:pk>/', ProductDetailApiView.as_view(), name='product-detail-view'),
    path('category/', CategoryListApiView.as_view(), name = 'category-list-view'),
    path('category/<int:pk>/', CategoryDetailApiView.as_view(), name='product-detail-view'),
    path('<str:category>/products/', ProductListByCategory.as_view(), name='product-list-by-category'),
    path('stores/', StoreListApiView.as_view(), name = 'store-list-view'),
]

from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('login/', views.login, name='login'),
    path('roomFurnitures/', views.roomFurnitures, name='roomFurnitures'),
    path('furniture/', views.furniture, name='furniture'),
    path('order/', views.order, name='order'),
    path('adminDashboard/', views.adminDashboard, name='adminDashboard'),
    path('addToCart/', views.addToCart, name='addToCart'),
    path('cartList/', views.cartList, name='cartList'),
    path('roomDetail/', views.roomDetail, name='roomDetail'),
    path('roomDetail/<str:image_id>/', views.roomDetail, name='roomDetail'),
    path('roomFurnitures/<str:room_id>/', views.roomFurnitures, name='roomFurnitures'),
]
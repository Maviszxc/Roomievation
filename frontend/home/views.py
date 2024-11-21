from django.contrib.auth import authenticate
from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404
import requests

def home(request):
    return render(request, 'html/index.html')

def dashboard(request):
    return render(request, 'html/dashboard.html')

def login(request):
    return render(request, 'html/login.html')

def furniture(request):
    return render(request, 'html/furniture.html')

def order(request):
    return render(request, 'html/order.html')

def adminDashboard(request):
    return render(request, 'html/adminDashboard.html')

def addToCart(request):
    return render(request, 'html/addToCart.html')  # Removed comma

def cartList(request):
    return render(request, 'html/cartList.html')  # Removed comma

def roomDetail(request, image_id):
    try:
        response = requests.get(f'http://localhost:4000/api/v1/roomModels/{image_id}')
        if response.status_code == 200:
            room_model = response.json()
            return render(request, 'html/roomDetail.html', {'room_model': room_model})
        else:
            return render(request, 'html/404.html')
    except Exception as e:
        print(f"Error fetching room model: {e}")
        return render(request, 'html/404.html')
    
def roomFurnitures(request, room_id):
    return render(request, 'html/roomFurnitures.html', {'room_id': room_id})

def room_furniture_view(request, furniture_id):
    return render(request, 'roomFurniture.html', {'furnitureID': furniture_id})
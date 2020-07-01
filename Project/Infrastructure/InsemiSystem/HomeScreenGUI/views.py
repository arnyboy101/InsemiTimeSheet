from django.shortcuts import render
from rest_framework import generics
from .models import *


# Create your views here.
def index(request):
    return render(request, 'HomeScreenGUI/index.html')

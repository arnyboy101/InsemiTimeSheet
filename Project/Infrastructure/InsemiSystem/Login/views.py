from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework import generics
# Create your views here.

class LoginsList(generics.ListCreateAPIView):
    queryset = LoginDetails.objects.all()
    serializer_class = LoginSerializer


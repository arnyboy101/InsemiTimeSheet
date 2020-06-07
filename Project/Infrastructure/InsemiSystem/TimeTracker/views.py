from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework import generics


# Create your views here.
class ActivityListCreate(generics.ListCreateAPIView):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer



    
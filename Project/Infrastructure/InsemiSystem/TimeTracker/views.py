from django.shortcuts import render
from .models import Activity
from .serializers import ActivitySerializer
from rest_framework import generics


# Create your views here.
class ActivityListCreate(generics.ListCreateAPIView):
    queryset = Activity
    serializer_class = ActivitySerializer



    
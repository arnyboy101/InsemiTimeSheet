from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework import generics, permissions


# Create your views here.
class ActivityListCreate(generics.ListCreateAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer

class ChoicesListCreate(generics.ListCreateAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset = Choices.objects.all()
    serializer_class = ChoicesSerializer



    
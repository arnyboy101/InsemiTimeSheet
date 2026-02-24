from rest_framework import generics, permissions

from .models import *
from .serializers import *


# Create your views here.
class ActivityListCreate(generics.ListCreateAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer


class ChoicesListCreate(generics.ListCreateAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset = Choices.objects.all()
    serializer_class = ChoicesSerializer

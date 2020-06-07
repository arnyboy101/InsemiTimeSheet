from django.urls import path, include
from . import views 

urlpatterns = [
    path('op/',views.index),
    ]
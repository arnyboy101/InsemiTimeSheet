from django.urls import path,include
from .views import *
from . import views

urlpatterns = [
    path('',views.index)
]


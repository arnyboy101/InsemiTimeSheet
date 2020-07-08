from django.urls import path
from .views import *
urlpatterns = [
    path('', navigation_page),
]
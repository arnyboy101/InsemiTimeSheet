from django.urls import path

from . import views

urlpatterns = [
    path("op/", views.index),
]

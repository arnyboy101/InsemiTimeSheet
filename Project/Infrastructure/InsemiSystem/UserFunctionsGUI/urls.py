from django.urls import path

from . import views


urlpatterns = [
    path('',views.UserFunc),
    path('/change',views.UserChange)
]
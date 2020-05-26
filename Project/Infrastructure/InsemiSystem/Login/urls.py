from django.urls import path
from . import views 

urlpatterns = [
    path('api/login_page', views.LoginsList.as_view()),
]
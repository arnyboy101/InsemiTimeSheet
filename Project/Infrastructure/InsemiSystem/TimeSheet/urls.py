from . import views
from django.urls import path, include

urlpatterns = [
    path('api/allObjects/',views.ActivityListCreate.as_view()),
    path('api/Choices/', views.ChoicesListCreate.as_view()),
]
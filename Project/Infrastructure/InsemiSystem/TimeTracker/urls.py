from . import views
from django.urls import path, include

urlpatterns = [
    path('api/TimeTracker/allObjects/',views.ActivityListCreate.as_view()),
]
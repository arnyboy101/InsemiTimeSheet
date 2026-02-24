from django.urls import path

from . import views

urlpatterns = [
    path("api/TimeTracker/allObjects/", views.ActivityListCreate.as_view()),
    path("api/Choices/", views.ChoicesListCreate.as_view()),
]

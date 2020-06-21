from django.urls import path

from . import views

urlpatterns = [
    path('register',views.RegisterView.as_view()),
    path('login/', views.login_page),
    path('authenticate/', views.check)
]
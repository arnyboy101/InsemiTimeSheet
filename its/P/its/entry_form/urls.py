from django import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('forms/', views.get_project, name='form')

]
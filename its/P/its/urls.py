"""its URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from P.views import *

from P.views import AdminSignUpView, HRSignUpView, MGRSignUpView, EMPSignUpView

urlpatterns = [
    path('P/', include('P.urls')),
    path('admin/', admin.site.urls),
    path('accounts/', include('django.contrib.auth.urls')),
    path('accounts/signup/admin1/', AdminSignUpView.as_view(), name='adm', ),
    path('accounts/signup/hr/', HRSignUpView.as_view(), name='HR', ),
    path('accounts/signup/mgr/', MGRSignUpView.as_view(), name='MGR', ),
    path('accounts/signup/emp/', EMPSignUpView.as_view(), name='EMP', ),


]

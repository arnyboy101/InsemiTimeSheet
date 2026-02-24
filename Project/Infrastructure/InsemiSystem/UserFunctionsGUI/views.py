from django.http import *
from django.shortcuts import render
from django.views.generic import *


def UserFunc(request):
    return render(request, "UserFunctionsGUI/UserFunc.html")


def UserChange(request):
    return render(request, "UserFunctionsGUI/UserChange.html")

from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required
from django.http import *
from django.shortcuts import redirect
from django.shortcuts import render
from django.template.context_processors import request
from django.views.generic import *


def UserFunc(request):
    return render(request,'UserFunctionsGUI/UserFunc.html')

def UserChange(request):
    return render(request,'UserFunctionsGUI/UserChange.html')

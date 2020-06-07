from django.shortcuts import render
from django.template import *

# Create your views here.
def DefaultPage(request):
    return render(request,'LoginGUI/index.html')


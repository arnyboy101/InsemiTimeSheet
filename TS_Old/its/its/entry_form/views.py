from django.shortcuts import render
from django.http import *
from .forms import Proj
# Create your views here.
def index(request):
    return HttpResponse("You've reached the right website bro!")
def get_project(request):
    if request.method == 'POST':
        form = Proj(request.POST)
        if form.is_valid():
            return HttpResponse('/thanks/')
    else:
        form = Proj()
    return render(request, 'project.html', {'form':form})
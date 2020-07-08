from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required
from django.http import *
from django.shortcuts import redirect
from django.shortcuts import render
from django.template.context_processors import request
from django.views.generic import *
from .forms import *
from rest_framework import generics
from .serializers import *
from datetime import datetime

class RegisterView(CreateView):
    model = UserDef

    form_class = RegisterForm
    template_name = 'UserModel/signup_form.html'

    def form_valid(self,form):
        user = form.save()

        return redirect('/users/login/')

def login_page(request):
    model = UserDef
    if request.method == 'POST':
        logging = Login(request.POST)
    else:
        logging = Login()
    return render(request, 'UserModel/login.html', {'login': logging})

def check(request):
    model = UserDef
    data=request.POST.copy()
    username = data.get('Username')
    password = data.get('Password')
    user = authenticate(request, username=username, password=password)
   
    valid = ""
    if user is not None:
        login(request,user)
        user.previous_login = datetime.now()
        user.save()
        return redirect('/home/',{'user':user})
    else:
        return HttpResponseNotFound("<p> Login failed!. Please check your username and password. </p>")
    

    
    return redirect('/home/')

def settings(request):
    return render(request,'UserModel/settings.html')

def userfunc(request):
    #if user.user_type == "Admin":
    return render(request,'UserModel/userfunc.html')
    #else:
     #   return HttpResponseNotFound("<p> You are not authorised to access this function </p>")


        

class UserListCreate(generics.ListCreateAPIView):
    queryset = UserDef.objects.all()
    serializer_class = UserDefSerializer

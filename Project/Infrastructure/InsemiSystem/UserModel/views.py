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
from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView


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
        

class UserListCreate(generics.ListCreateAPIView):
    queryset = UserDef.objects.all()
    serializer_class = UserDefSerializer

@api_view(['GET'])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """
    
    serializer = UserDefSerializer(request.user)
    return Response(serializer.data)


class UserList(APIView):
    """
    Create a new user. It's called 'UserList' because normally we'd have a get
    method here too, for retrieving a list of all User objects.
    """

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
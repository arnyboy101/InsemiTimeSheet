from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required
from django.http import *
from django.shortcuts import redirect
from django.shortcuts import render
from django.template.context_processors import request
from django.views.generic import *
from .forms import *

class RegisterView(CreateView):
    model = UserDef

    form_class = RegisterForm
    template_name = 'UserModel/signup_form.html'

    def form_valid(self,form):
        user = form.save()

        return redirect('/users/login/')

def login_page(request):
    model = User
    if request.method == 'POST':
        logging = Login(request.POST)
    else:
        logging = Login()
    return render(request, 'UserModel/login.html', {'login': logging})
        

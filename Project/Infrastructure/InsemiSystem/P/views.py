from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required
from django.http import *
from django.shortcuts import redirect
from django.shortcuts import render
from django.template.context_processors import request
from django.views.generic import *
from .decorators import *
from .forms import *

# Create your views here.
def index(request):
    return HttpResponse("You've reached the right website bro!")


def get_project(request):
    if request.method == 'POST':
        form = Proj(request.POST)
        if form.is_valid():
            return HttpResponse("/thanks/")
    else:
        form = Proj()
    return render(request, 'form1\project.html', {'form': form})


def formRenderer(request):
    data = request.POST.copy()
    cont = {
        'SupEmail': data.get("SupervisorsEmail"),
        'Project': data.get("ProjectName"),
        'Monday': data.get("Monday"),
        'Tuesday': data.get("Tuesday"),
        'Wednesday': data.get("Wednesday"),
        'Thursday': data.get("Thursday"),
        'Friday': data.get("Friday")}

    df = pd.DataFrame(data=cont.values(), index=cont).to_csv("DATA.csv")

    return render(request, 'form1/results.html', cont)


def login_page(request):
    model = User
    if request.method == 'POST':
        logging = Login(request.POST)
    else:
        logging = Login()
    return render(request, 'form1/login.html', {'login': logging})

def check(request):
    model = User
    data = request.POST.copy()
    username = data.get('Username')
    password = data.get('Password')
    user = authenticate(request, username=username, password=password)
    print(username)
    print(password)

    if user is not None:
        login(request, user)
        if user.is_Admin:
            return redirect('/P/adminF/')
        elif user.is_HR:
            return redirect('/P/HRL/')
        elif user.is_MGR:
            return redirect('/P/MGRL/')
        elif user.is_EMP:
            return redirect('/P/EMPL/')
    return render(request,'form1/basel.html',{'USTYPE':'ERROR'})

def AdminLandingPage(request):
    user = request.user
    admin = user.admins
    name = str(admin)
    print(name)
    return render(request,'form1/adminlanding.html',{'USTYPE':"ADMIN","FN":name})


def HRLandingPage(request):
    user = request.user
    admin = user.hrs
    name = str(admin)
    print(name)
    return render(request,'form1/hrlandingpage.html',{'USTYPE':"Human Resources","NAME":name})


def MGRLandingPage(request):
    user = request.user
    admin = user.mgrs
    name = str(admin)
    print(name)
    return render(request, 'form1/mgrlanding.html', {'USTYPE': "Manager", "NAME": name})


def EMPLandingPage(request):
    user = request.user
    admin = user.emps
    name = str(admin)
    print(name)
    return render(request, 'form1/empland.html', {'USTYPE': "Manager", "NAME": name})




class AdminSignUpView(CreateView):
    model = User
    form_class = AdminSignUpForm
    template_name = 'form1/signup_form.html'

    def get_context_data(self, **kwargs):
        kwargs['user_type'] = 'ADMIN'
        return super().get_context_data(**kwargs)
    def form_valid(self, form):
        user = form.save()

        return redirect('/P/login_page/')






class HRSignUpView(CreateView):
    model = User
    form_class = HRSignUpForm
    template_name = 'form1/signup_form.html'

    def get_context_data(self, **kwargs):
        kwargs['user_type'] = 'HR'
        return super().get_context_data(**kwargs)

    def form_valid(self,form):
        user = form.save()
        logout(request)
        login(request, user)
        logout(request)
        return redirect('/P/login_page/')

class MGRSignUpView(CreateView):
    model = User
    form_class = MGRSignUpForm
    template_name = 'form1/signup_form.html'

    def get_context_data(self, **kwargs):
        kwargs['user_type'] = 'Manager'
        return super().get_context_data(**kwargs)

    def form_valid(self,form):
        user = form.save()
        login(request, user)
        logout(request)
        return redirect('/P/login_page/')

class EMPSignUpView(CreateView):
    model = User
    form_class = EMPSignUpForm
    template_name = 'form1/signup_form.html'

    def get_context_data(self, **kwargs):
        kwargs['user_type'] = 'Employee'
        return super().get_context_data(**kwargs)

    def form_valid(self,form):
        user = form.save()
        logout(self.request)
        login(self.request, user)
        logout(self.request)
        return redirect('/P/login_page/')

def logout1(request):
    logout(request)
    return redirect("/P/login_page/")
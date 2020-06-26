from django import forms
from django.contrib.auth.admin import UserAdmin


class Proj(forms.Form):
    OPTIONS = [('8','8 hours'),('O','Optional Leave'),('C','Casual Leave'),('E','Earned Leave'),('S','Sick Leave')]
    SupervisorsEmail = forms.EmailField(label="Supervisor's Email",initial="Manager@insemitech.com")
    ProjectName = forms.CharField(label="Project Name",initial="Enter project name", max_length=256)
    Monday = forms.ChoiceField(label = "Monday",widget=forms.Select, choices=OPTIONS)
    Tuesday = forms.ChoiceField(label="Tuesday", widget=forms.Select, choices=OPTIONS)
    Wednesday = forms.ChoiceField(label="Wednesday", widget=forms.Select, choices=OPTIONS)
    Thursday = forms.ChoiceField(label="Thursday", widget=forms.Select, choices=OPTIONS)
    Friday = forms.ChoiceField(label="Friday", widget=forms.Select, choices=OPTIONS)

class Login(forms.Form):
    Username = forms.CharField(label="Enter your email-adress")
    Password = forms.CharField(label='Password',widget=forms.PasswordInput)

from django.contrib.auth.forms import *
from django.db import transaction
from .models import *

class AdminSignUpForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = User
    fname = forms.CharField(label = 'First Name', max_length=256)
    lname = forms.CharField(label = 'Last Name', max_length=256)
    @transaction.atomic
    def save(self):
        user = super().save(commit=False)
        user.save()

        user.is_Admin = True
        user.save()
        admin1 = Admins.objects.create(user=user)
        admin1.first_name=(self.cleaned_data.get('fname'))
        admin1.last_name=(self.cleaned_data.get('lname'))
        return user

class HRSignUpForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = User

    fname = forms.CharField(label='First Name', max_length=256)
    lname = forms.CharField(label='Last Name', max_length=256)
    @transaction.atomic()
    def save(self, commit=True):
        user = super().save(commit=False)
        user.save()
        user.is_HR = True
        user.save()
        hr1 = HRs.objects.create(user=user)
        dat = self.cleaned_data
        hr1.first_name = (dat.get('fname'))

        hr1.last_name = (dat.get('lname'))
        return user


class MGRSignUpForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = User
    fname = forms.CharField(label='First Name', max_length=256)
    lname = forms.CharField(label='Last Name', max_length=256)
    @transaction.atomic()
    def save(self, commit=True):
        user = super().save(commit=False)
        user.save()
        user.is_MGR = True
        user.save()
        hr1 = MGRs.objects.create(user=user)
        dat = self.cleaned_data
        hr1.first_name = (dat.get('fname'))

        hr1.last_name = (dat.get('lname'))
        return user

class EMPSignUpForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = User
    fname = forms.CharField(label='First Name', max_length=256)
    lname = forms.CharField(label='Last Name', max_length=256)
    @transaction.atomic()
    def save(self, commit=True):
        user = super().save(commit=False)
        user.save()
        user.is_EMP = True
        user.save()
        hr1 = EMPs.objects.create(user=user)
        dat = self.cleaned_data
        hr1.first_name = (dat.get('fname'))

        hr1.last_name = (dat.get('lname'))
        return user


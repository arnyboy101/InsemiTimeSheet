from django import forms
from django.contrib.auth.forms import *
from django.db import transaction
from .models import *

class RegisterForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = UserDef
    
    empId = forms.IntegerField(label='Employee ID')    
    fname = forms.CharField(label='First Name', max_length=256)
    lname = forms.CharField(label='Last Name', max_length=256)
    @transaction.atomic
    def save(self):
        user = super().save(commit=False)
        user.save()
        user.employeeId = (self.cleaned_data.get('empId'))
        user.first_name = (self.cleaned_data.get('fname'))
        user.last_name = (self.cleaned_data.get('lname'))
        user.save()
        return user

class Login(forms.Form):
    Username = forms.CharField(label="Enter your email-adress")
    Password = forms.CharField(label='Password',widget=forms.PasswordInput)
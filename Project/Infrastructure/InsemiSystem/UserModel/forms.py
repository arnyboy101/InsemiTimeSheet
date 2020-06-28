from django import forms
from django.contrib.auth.forms import *
from django.db import transaction
from .models import *
from datetime import datetime

class RegisterForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = UserDef
    
    empId = forms.IntegerField(label='Employee ID')    
    fname = forms.CharField(label='First Name', max_length=256)
    lname = forms.CharField(label='Last Name', max_length=256)
    USER_TYPES = [("Admin","Admin"), ('Director',"Director"), ('Sr. Manager',"Sr. Manager"), ('Manager',"Manager") , ('Sr. Engineer',"Sr. Engineer"), ('Assistant Regional Manager',"Assistant Regional Manager"), ('Assistant to the Regional Manager',"Assistant to the Regional Manager")]
    ut = forms.CharField(label = 'User Type', widget = forms.Select(choices=USER_TYPES))


    @transaction.atomic
    def save(self):
        user = super().save(commit=False)
        user.save()
        user.employeeId = (self.cleaned_data.get('empId'))
        user.first_name = (self.cleaned_data.get('fname'))
        user.last_name = (self.cleaned_data.get('lname'))
        user.user_type = (self.cleaned_data.get('ut'))
        user.save()
        return user

class Login(forms.Form):
    Username = forms.CharField(label="Enter your email-adress")
    Password = forms.CharField(label='Password',widget=forms.PasswordInput)
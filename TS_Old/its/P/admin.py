from django import forms
from django.contrib import admin
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin, UserAdmin
from django.contrib.auth.forms import ReadOnlyPasswordHashField, UserChangeForm, UserCreationForm
from .models import *
from .models import *

# Register your models here.
admin.site.register(User, UserAdmin)
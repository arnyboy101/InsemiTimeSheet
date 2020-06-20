
from django import forms
from django.contrib import admin
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.forms import ReadOnlyPasswordHashField




# Register your models here.
from Hierarchy.models import User

class UserCreationForm(forms.ModelForm):
    password1 = forms.CharField(label='Password', widget=forms.PasswordInput)
    password2 = forms.CharField(label='Password Confirmation', widget=forms.PasswordInput)

    class Meta:
        model = CustomUser
        fields = ('employeeId','email_address','first_name','last_name')

    def clean_password2(self):
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")

        if password1 and password2 and password1 != password2:
            raise forms.ValidationError("Passwords don't match")
        return password1
    
    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()
        return user
    
class UserAdmin(BaseUserAdmin):
    add_form = UserCreationForm

    list_display = ('employeeId','email_address','first_name','last_name')
    list_filter = ('is_admin',)

    fieldsets = (
        ('Authentication',{'fields':('employeeId','email','password')}),
        ('Personal Information',{'fields':('first_name','last_name',)}),
        ('Permissions',{'fields':('is_admin',)}),
    ) 

    add_fields = (
        (None,{
            'classes':('wide',),
            'fields':('email','employeeId','first_name','last_name','password1','password2'),
        }),
    )

    search_fields = ('email','employeeId','first_name','last_name')
    ordering = ('employeeId',)
    filter_horizontal = ()
from django.contrib.auth.models import (AbstractBaseUser, BaseUserManager)
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.admin import UserAdmin
from django.db import models


class UserManager(BaseUserManager):

    def create_user(self,employeeId,email_address,first_name,last_name,created_at,password=None):
        if not employeeId:
            raise ValueError('Users must have an Employee ID')

        user = self.model(
            employeeId=employeeId,
            email_address=self.normalize_email(email_address),
            first_name=first_name,
            last_name=last_name,
            created_at=created_at,
        
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

        

    def create_superuser(self,employeeId,email_address,first_name,last_name,created_at,password=None):
        if not employeeId:
            raise ValueError('Users must have an Employee ID')

        user = self.create_user(
            employeeId=employeeId,
            email_address=self.normalize_email(email_address),
            first_name=first_name,
            last_name=last_name,
            created_at=created_at,
            password = password
        
        )

        user.is_admin = True
        user.save(using=self._db)
        return user


class CustomUser(AbstractUser):

    

    employeeId  = models.IntegerField(unique=True)
    email_address = models.EmailField()
    password = models.CharField(max_length=512)
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    created_at = models.DateTimeField(auto_now_add=True)
    is_admin = models.BooleanField()

    objects = UserManager()  

    REQUIRED_FIELDS = ['employeeId','email_address','first_name','last_name','created_at','password']
    USERNAME_FIELD = 'email_address'

    
    def __str__(self):
        return first_name + last_name
        
    def has_perm(self,perm,obj=None):
        return True
    
    def has_module_perms(self,Login):
        return True
    
    @property 
    def is_staff(self):
        return self.is_admin

    #class Meta:
        #app_label = 'CustomUser'
        #db_table = "CustomUser"

    

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _
# Create your models here.

class UserDef(AbstractUser):
    def __str__(self):
        return self.first_name + self.last_name
    
    employeeId = models.IntegerField(unique=True)
    email_address = models.EmailField()
    first_name = models.CharField(max_length=256)
    last_name = models.CharField(max_length=256)
    USER_TYPES = [("Admin","Admin"), ('Manager',"Manager"), ('HR', 'Human Resources'), ('Employee','Employee')]
    user_type = models.CharField(max_length=2048, choices=USER_TYPES)
    created_at = models.DateTimeField(auto_now_add=True)
    previous_login = models.DateTimeField()
    

class LoginCount(models.Model):
    lc = models.IntegerField(unique=True)

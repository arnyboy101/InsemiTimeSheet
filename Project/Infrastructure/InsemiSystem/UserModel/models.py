from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.

class UserDef(AbstractUser):
    def __str__(self):
        return self.first_name + self.last_name
    
    employeeId = models.IntegerField(unique=True)
    email_address = models.EmailField()
    first_name = models.CharField(max_length=256)
    last_name = models.CharField(max_length=256)
    USER_TYPES = [('1',"Admin"), ('2',"Director"), ('3',"Sr. Manager"), ('4',"Manager") , ('5',"Sr. Engineer"), ('6',"Assistant Regional Manager"), ('7',"Assistant to the Regional Manager")]
    user_type = models.CharField(max_length=2048, choices=USER_TYPES)
    created_at = models.DateTimeField(auto_now_add=True)

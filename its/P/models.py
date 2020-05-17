from django.contrib.auth.models import AbstractUser
from django.db import models


# Create your models here.
class Project1(models.Model):
    proj1 = models.CharField(max_length=256)


'''
class User(AbstractUser):
    is_admin = models.BooleanField('Admin_Status', default = False )
    is_hr = models.BooleanField('HR_Status', default=False)
    is_mgr = models.BooleanField('Manager_Status', default = False)
    is_emp = models.BooleanField('Employee_Status',default=True)
'''


class User(AbstractUser):
    is_Admin = models.BooleanField(default=False)
    is_HR = models.BooleanField(default=False)
    is_MGR = models.BooleanField(default=False)
    is_EMP = models.BooleanField(default=True)


class Admins(models.Model):

    def __str__(self):
        return self.user.username

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    user.is_admin = True
    first_name = models.CharField(max_length=256)
    last_name = models.CharField(max_length=256)




class HRs(models.Model):
    def __str__(self):
        return self.user.username
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=256)
    last_name = models.CharField(max_length=256)


class MGRs(models.Model):
    def __str__(self):
        return self.user.username
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=256)
    last_name = models.CharField(max_length=256)


class EMPs(models.Model):
    def __str__(self):
        return self.user.username

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=256)
    fn = first_name.__str__()
    last_name = models.CharField(max_length=256)

from django.db import models
from django_mysql.models import ListCharField

# Create your models here.

status_choices = ["WFH","WFO","Earned Leave","Sick Leave","Maternity Leave","Paternity Leave","Emergency Leave"]
class Activity(models.Model):
    employeeId = models.CharField(max_length = 64, default=None)
    employeeName = models.CharField(max_length = 256, default=None)
    Project_code = models.CharField(max_length = 256, default=None)
    Project_name = models.CharField(max_length = 256, default=None)
    Manager = models.CharField(max_length = 256, default=None)
    Vendor_name = models.CharField(max_length = 256, default=None)
    Leaves_availed = models.IntegerField
    Work_location = models.CharField(max_length = 256, default=None)
    Customer_name = models.CharField(max_length = 256, default=None)
    Date = models.DateField(auto_now_add = False, default=None)
    Day = models.CharField(max_length = 16, default=None)
    Opening_time = models.TimeField(auto_now_add=False, default=None)
    Closing_time = models.TimeField(auto_now_add=False, default=None)
    Total_hours = models.TimeField(auto_now_add=False, default=None)
    Status = models.CharField(max_length = 128, default=None)
    Remarks = models.CharField(max_length = 256, default=None)
    

class Choices(models.Model):
    choices = ListCharField(
        base_field=models.CharField(max_length=256),
        size=15,
        max_length=(15*257),
    )



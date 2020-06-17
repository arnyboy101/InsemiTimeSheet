from django.db import models
from django_mysql.models import ListCharField

# Create your models here.


class Activity(models.Model):
    employeeId = models.IntegerField()
    Project = models.CharField(max_length = 256)
    AddComments = models.TextField(max_length = 1000)
    logged_time = models.IntegerField()
    
class Choices(models.Model):
    choices = ListCharField(
        base_field=models.CharField(max_length=256),
        size=6,
        max_length=(6*257),
    )






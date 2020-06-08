from django.db import models
from Login.models import LoginDetails



# Create your models here.
class Activity(models.Model):
    employeeId = models.IntegerField()
    CHOICES = [('1','Placeholder'),('2','While'),('3','We'),('4','Figure'),('5','This'),('6','Out')]
    Project = models.CharField(max_length = 200, choices = CHOICES)
    AddComments = models.TextField(max_length = 1000)
    start_time = models.TimeField(auto_now_add=True)
    end_time = models.TimeField()




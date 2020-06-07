from django.db import models

# Create your models here.
class Activity(models.Model):
    CHOICES = [('1','Placeholder'),('2','While'),('3','We'),('4','Figure'),('5','This'),('6','Out')]
    Project = models.CharField(max_length = 200, choices = CHOICES)
    AddComments = models.TextField(max_length = 1000)



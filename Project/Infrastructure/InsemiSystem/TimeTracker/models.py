from django.db import models

# Create your models here.
class Activity(models.Model):
    CHOICES = [('1','Placeholder'),('2','While'),('3','We'),('4','Figure'),('5','This'),('6','Out')]
    projects = models.CharField(max_length = 200, choices = CHOICES)
    add_comments = models.TextField(max_length = 1000)



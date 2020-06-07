from django.db import models

# Create your models here.
class LoginDetails (models.Model):
    first_name = models.CharField(max_length=256)
    last_name = models.CharField(max_length=256)
    email=models.EmailField()
    employee_Id = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    
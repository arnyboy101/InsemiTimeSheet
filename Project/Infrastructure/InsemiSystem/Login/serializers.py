from rest_framework import serializers
from .models import *

class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoginDetails
        fields = ('id','first_name','last_name','email','employee_Id','created_at')


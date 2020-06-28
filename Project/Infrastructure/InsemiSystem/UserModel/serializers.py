from rest_framework import serializers
from .models import *

class UserDefSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserDef
        fields = ('id','employeeId','username','password','first_name','last_name','user_type','created_at','previous_login')



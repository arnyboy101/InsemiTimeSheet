from rest_framework import serializers
from .models import *

class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = ('id','employeeId','Project_code','Date','Opening_time','Closing_time','Total_hours','Status','Remarks')


class ChoicesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choices
        fields = ('employeeId','Project_No','Project_code','Project_name','Manager','Customer_name','Vendor_name')

from rest_framework import serializers
from .models import *

class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = ('id','employeeId','employeeName','Project_code','Project_name', 'Manager','Vendor_name','Leaves_availed','Work_location','Customer_name','Date','Day','Opening_time','Closing_time','Total_hours','Status','Remarks')


class ChoicesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choices
        fields = ('id','choices')

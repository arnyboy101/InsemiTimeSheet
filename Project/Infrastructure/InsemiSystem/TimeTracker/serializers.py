from rest_framework import serializers
from .models import *

class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = ('id','employeeId','Project','AddComments','logged_time', 'created_at',)


class ChoicesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choices
        fields = ('id','choices')

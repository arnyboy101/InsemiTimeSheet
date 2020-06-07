from rest_framework import serializers
from .models import Activity

class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        models = Activity
        fields = ('id','projects','add_comments')



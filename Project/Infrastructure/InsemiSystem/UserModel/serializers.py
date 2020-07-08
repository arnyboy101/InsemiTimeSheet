from rest_framework import serializers
from .models import *
from rest_framework_jwt.settings import api_settings

class UserDefSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserDef
        fields = ('id','employeeId','username','password','first_name','last_name','user_type','created_at','previous_login')

class LCSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoginCount
        fields = ('id','lc')

class UserSerializerWithToken(serializers.ModelSerializer):

    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = UserDef
        fields = ('token', 'username', 'password')


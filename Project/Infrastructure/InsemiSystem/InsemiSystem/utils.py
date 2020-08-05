
from UserModel.serializers import *


def my_jwt_response_handler(token, user=None, request=None):
    return {
        'token': token,
        'user': UserDefSerializer(user, context={'request': request}).data
    }
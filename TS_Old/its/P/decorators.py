from django.contrib.auth.decorators import *

def admin_required(function=None, redirect_field_name = REDIRECT_FIELD_NAME, login_url = 'login'):
    actual_decorator = user_passes_test(
        lambda u : u.is_active and u.is_Admin, login_url = login_url, redirect_field_name=redirect_field_name
        )
    if function:
        return actual_decorator(function)
    return actual_decorator

def hr_required(function=None, redirect_field_name = REDIRECT_FIELD_NAME, login_url = 'login'):
    actual_decorator = user_passes_test(
        lambda u : u.is_active and u.is_HR, login_url = login_url, redirect_field_name=redirect_field_name
        )
    if function:
        return actual_decorator(function)
    return actual_decorator

def mgr_required(function=None, redirect_field_name = REDIRECT_FIELD_NAME, login_url = 'login'):
    actual_decorator = user_passes_test(
        lambda u : u.is_active and u.is_MGR, login_url = login_url, redirect_field_name=redirect_field_name
        )
    if function:
        return actual_decorator(function)
    return actual_decorator


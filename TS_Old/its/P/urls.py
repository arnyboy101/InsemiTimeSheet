from django.urls import path, include

from . import views

urlpatterns = [
    path('',views.index, name='index'),
    path('forms/',views.get_project, name='form'),
    path('details/', views.formRenderer, name='details'),
    path('login_page/',views.login_page, name="loginp"),
    path('login/',views.check,name="login"),
    path('adminF/',views.AdminLandingPage, name='ADM'),
    path('HRL/', views.HRLandingPage, name='HRL'),
    path('MGRL/',views.MGRLandingPage, name = 'MGRL'),
    path('EMPL/', views.EMPLandingPage, name='EMPL'),
    path('logout/', views.logout1, name='LOG'),



]
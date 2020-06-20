from django.urls import path, include

from . import views

urlpatterns = [

    path('forms/',views.get_project, name='form'),
    path('details/', views.formRenderer, name='details'),
    path('login_page/',views.login_page, name="loginp"),
    path('login/',views.check,name="login"),
    path('adminF/',views.AdminLandingPage, name='ADM'),
    path('HRL/', views.HRLandingPage, name='HRL'),
    path('MGRL/',views.MGRLandingPage, name = 'MGRL'),
    path('EMPL/', views.EMPLandingPage, name='EMPL'),
    path('logout/', views.logout1, name='LOG'),
    path('accounts/', include('django.contrib.auth.urls')),
    path('accounts/signup/admin1/', views.AdminSignUpView.as_view(), name='adm', ),
    path('accounts/signup/hr/', views.HRSignUpView.as_view(), name='HR', ),
    path('accounts/signup/mgr/', views.MGRSignUpView.as_view(), name='MGR', ),
    path('accounts/signup/emp/', views.EMPSignUpView.as_view(), name='EMP', )



]
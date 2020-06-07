from django.shortcuts import render

# Create your views here.

def Calendar(request):
    return render (request,'CalendarGUI/calendar.html')


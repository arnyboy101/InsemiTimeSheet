from django.shortcuts import render

# Create your views here.
def navigation_page(request):
    return render(request, 'AuthGUI/navpage.html')


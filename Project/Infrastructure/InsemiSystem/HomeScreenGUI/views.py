from django.shortcuts import render

# Create your views here.
def DefaultPage(request):
    return render(request, 'HomeScreenGUI/index.html')


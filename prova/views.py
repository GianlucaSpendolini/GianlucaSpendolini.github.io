from django.shortcuts import render
# Aggiunte da me
from django.http import HttpResponse

# Create your views here.

def home(request):
    return HttpResponse("hello")
from django.http import HttpResponse
from django.template import loader
from django.shortcuts import render
from .models import Project

def index(request):
    return HttpResponse("This is a placeholder page for the Code for SF Project Match admin component. Please visit the admin route.")

def create_project(request):
	return render(request, 'create_project/index.html',)
from django.http import HttpResponse, Http404
from django.shortcuts import render

def index(request):
	return HttpResponse("This is a placeholder page for the Project Match admin component.")
from django.http import HttpResponse, Http404
from django.template import loader
from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, mixins, generics, permissions
from .models import Project, ProjectLead
from .serializers import ProjectLeadSerializer
from .permissions import IsOwnerOrReadOnly

def index(request):
    return HttpResponse("This is a placeholder page for the Code for SF Project Match admin component. Please visit the admin route.")

def create_project(request):
	return render(request, 'create_project/index.html',)

class ProjectLeadList(generics.ListCreateAPIView):
	queryset = ProjectLead.objects.all()
	serializer_class = ProjectLeadSerializer
	permissions_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly,)

	def perform_create(self, serializer):
		serializer.save(owner=self.request.user)

class ProjectLeadDetail(generics.RetrieveUpdateDestroyAPIView):
	queryset = ProjectLead.objects.all()
	serializer_class = ProjectLeadSerializer
	permissions_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly,)
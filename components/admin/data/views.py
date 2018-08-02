from django.http import HttpResponse, Http404
from django.template import loader
from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, mixins, generics, permissions
from .models import SkillsTaxonomy, InterestsTaxonomy, GoalsTaxonomy, Project, ProjectLead
from .serializers import SkillsTaxonomySerializer, InterestsTaxonomySerializer, GoalsTaxonomySerializer, ProjectLeadSerializer, ProjectSerializer
from .permissions import IsOwnerOrReadOnly

def index(request):
    return HttpResponse("This is a placeholder page for the Code for SF Project Match admin component. Please visit the admin route.")

def create_project(request):
	return render(request, 'create_project/index.html',)

class SkillsTaxonomyList(generics.ListCreateAPIView):
	queryset = SkillsTaxonomy.objects.all()
	serializer_class = SkillsTaxonomySerializer
	permissions_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly,)

class SkillsTaxonomyDetail(generics.RetrieveUpdateDestroyAPIView):
	queryset = SkillsTaxonomy.objects.all()
	serializer_class = SkillsTaxonomySerializer
	permissions_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly,)

class InterestsTaxonomyList(generics.ListCreateAPIView):
	queryset = InterestsTaxonomy.objects.all()
	serializer_class = InterestsTaxonomySerializer
	permissions_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly,)

class InterestsTaxonomyDetail(generics.RetrieveUpdateDestroyAPIView):
	queryset = InterestsTaxonomy.objects.all()
	serializer_class = InterestsTaxonomySerializer
	permissions_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly,)

class GoalsTaxonomyList(generics.ListCreateAPIView):
	queryset = GoalsTaxonomy.objects.all()
	serializer_class = GoalsTaxonomySerializer
	permissions_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly,)	

class GoalsTaxonomyDetail(generics.RetrieveUpdateDestroyAPIView):
	queryset = GoalsTaxonomy.objects.all()
	serializer_class = GoalsTaxonomySerializer
	permissions_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly,)

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

class ProjectList(generics.ListCreateAPIView):
	queryset = Project.objects.all()
	serializer_class = ProjectSerializer
	permissions_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly,)

	def perform_create(self, serializer):
		serializer.save(owner=self.request.user)

class ProjectDetail(generics.RetrieveUpdateDestroyAPIView):
	queryset = Project.objects.all()
	serializer_class = ProjectSerializer
	permissions_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly,)
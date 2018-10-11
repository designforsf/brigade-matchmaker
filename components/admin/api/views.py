from django.http import HttpResponse, Http404
from django.shortcuts import render
from rest_framework import generics, permissions
from .models import SkillsTaxonomy, InterestsTaxonomy, GoalsTaxonomy, Project
from .serializers import SkillsTaxonomySerializer, InterestsTaxonomySerializer, GoalsTaxonomySerializer, ProjectSerializer
from .permissions import IsOwnerOrReadOnly

from django.contrib.auth.models import User
from django.views.generic import TemplateView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, mixins, generics, permissions
from .models import SkillsTaxonomy, InterestsTaxonomy, GoalsTaxonomy, Project, UserProfile
from .serializers import SkillsTaxonomySerializer, InterestsTaxonomySerializer, GoalsTaxonomySerializer, ProjectSerializer
from .permissions import IsOwnerOrReadOnly

def index(request):
    return render(request, 'index.html',)

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
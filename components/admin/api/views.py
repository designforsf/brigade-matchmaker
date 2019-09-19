from django.http import HttpResponse, Http404
from django.shortcuts import render
from rest_framework import generics, permissions, status, mixins
from .models import Skill, Interest, Goal, Project
from .serializers import SkillSerializer, InterestSerializer, GoalSerializer, ProjectSerializer
from .permissions import IsOwnerOrReadOnly
from django.contrib.auth.models import User
from django.views.generic import TemplateView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView


def index(request):
    return render(request, 'index.html',)

def create_project(request):
	return render(request, 'create_project/index.html',)

class SkillList(generics.ListCreateAPIView):
	queryset = Skill.objects.all()
	serializer_class = SkillSerializer
	permissions_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly,)

class SkillDetail(generics.RetrieveUpdateDestroyAPIView):
	queryset = Skill.objects.all()
	serializer_class = SkillSerializer
	permissions_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly,)

class InterestList(generics.ListCreateAPIView):
	queryset = Interest.objects.all()
	serializer_class = InterestSerializer
	permissions_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly,)

class InterestDetail(generics.RetrieveUpdateDestroyAPIView):
	queryset = Interest.objects.all()
	serializer_class = InterestSerializer
	permissions_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly,)

class GoalList(generics.ListCreateAPIView):
	queryset = Goal.objects.all()
	serializer_class = GoalSerializer
	permissions_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly,)	

class GoalDetail(generics.RetrieveUpdateDestroyAPIView):
	queryset = Goal.objects.all()
	serializer_class = GoalSerializer
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
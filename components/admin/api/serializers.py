from rest_framework import serializers
from .models import Skill, Interest, Goal, Project

class SkillSerializer(serializers.ModelSerializer):
	owner = serializers.ReadOnlyField(source='owner.username')
	class Meta:
		model = Skill
		fields = ('_id', 'name', 'title', 'parent')

class InterestSerializer(serializers.ModelSerializer):
	owner = serializers.ReadOnlyField(source='owner.username')
	class Meta:
		model = Interest
		fields = ('_id', 'name', 'title', 'parent')

class GoalSerializer(serializers.ModelSerializer):
	owner = serializers.ReadOnlyField(source='owner.username')
	class Meta:
		model = Goal
		fields = ('_id', 'name', 'title', 'parent')

class ProjectSerializer(serializers.ModelSerializer):
	owner = serializers.ReadOnlyField(source='owner.username')
	class Meta:
		model = Project
		fields = ('_id', 'preview', 'title', 'summary', 'skills_needed', 'learning_opportunity', 'civic_interests', 'pending_tasks', 'progress_made', 'additional_info', 'slack_channel', 'github_repository')
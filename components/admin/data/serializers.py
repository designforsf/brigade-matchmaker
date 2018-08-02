from rest_framework import serializers
from data.models import SkillsTaxonomy, InterestsTaxonomy, GoalsTaxonomy, ProjectLead, Project

class SkillsTaxonomySerializer(serializers.ModelSerializer):
	owner = serializers.ReadOnlyField(source='owner.username')
	class Meta:
		model = SkillsTaxonomy
		fields = ('name', 'title', 'parent')

class InterestsTaxonomySerializer(serializers.ModelSerializer):
	owner = serializers.ReadOnlyField(source='owner.username')
	class Meta:
		model = InterestsTaxonomy
		fields = ('name', 'title', 'parent')

class GoalsTaxonomySerializer(serializers.ModelSerializer):
	owner = serializers.ReadOnlyField(source='owner.username')
	class Meta:
		model = GoalsTaxonomy
		fields = ('name', 'title', 'parent')

class ProjectLeadSerializer(serializers.ModelSerializer):
	owner = serializers.ReadOnlyField(source='owner.username')
	class Meta:
		model = ProjectLead
		fields = ('name', 'github_user_name', 'email_address', 'slack_name', 'slack_id', 'owner')

class ProjectSerializer(serializers.ModelSerializer):
	owner = serializers.ReadOnlyField(source='owner.username')
	class Meta:
		model = Project
		fields = ('preview', 'title', 'summary', 'skills_needed', 'learning_opportunity', 'civic_interests', 'image_url', 'description', 'project_status', 'repository', 'website', 'project_lead', 'slack_channel', 'created')
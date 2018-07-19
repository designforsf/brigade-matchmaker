from django.contrib.auth.models import User
from rest_framework import serializers
from data.models import ProjectLead

class ProjectLeadSerializer(serializers.ModelSerializer):
	owner = serializers.ReadOnlyField(source='owner.username')
	class Meta:
		model = ProjectLead
		fields = ('name', 'github_user_name', 'email_address', 'slack_name', 'slack_id', 'owner')
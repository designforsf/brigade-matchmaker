from django.test import TestCase
from .models import SkillsTaxonomy, InterestsTaxonomy, GoalsTaxonomy, ProjectLead, Project

class ProjectLeadTest(TestCase):

	@classmethod
	def set_up_test_data(cls):
		ProjectLead.objects.create(name="first name")
		ProjectLead.objects.create(github_user_name="github user name here")

	#def test_name_content(self):


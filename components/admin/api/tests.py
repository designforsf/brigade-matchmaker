from django.test import TestCase
from .models import SkillsTaxonomy, InterestsTaxonomy, GoalsTaxonomy, Project

class ProjectTest(TestCase):

	@classmethod
	def set_up_test_data(cls):
		Project.objects.create(title="first project title")
		Project.objects.create(summary="project summary here")

	#def test_name_content(self):


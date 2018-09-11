from django.contrib import admin
from .models import SkillsTaxonomy, InterestsTaxonomy, GoalsTaxonomy, Project, UserProfile
# Register your models here.
admin.site.register(SkillsTaxonomy)
admin.site.register(InterestsTaxonomy)
admin.site.register(GoalsTaxonomy)
admin.site.register(UserProfile)
admin.site.register(Project)
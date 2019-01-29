from django.contrib import admin
from .models import Skill, Interest, Goal, Project, UserProfile
# Register your models here.
admin.site.register(Skill)
admin.site.register(Interest)
admin.site.register(Goal)
admin.site.register(UserProfile)
admin.site.register(Project)

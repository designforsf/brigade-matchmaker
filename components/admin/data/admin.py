from django.contrib import admin
from .models import Project, ProjectLead, SkillsTaxonomy

# Register your models here.
admin.site.register(Project)
admin.site.register(ProjectLead)
admin.site.register(SkillsTaxonomy)

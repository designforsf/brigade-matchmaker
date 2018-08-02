from django.contrib import admin
from .models import Project, ProjectLead, SkillsTaxonomy, InterestsTaxonomy, GoalsTaxonomy
from simple_history.admin import SimpleHistoryAdmin

# Register your models here.
admin.site.register(Project, SimpleHistoryAdmin)
admin.site.register(ProjectLead, SimpleHistoryAdmin)
admin.site.register(SkillsTaxonomy, SimpleHistoryAdmin)
admin.site.register(InterestsTaxonomy, SimpleHistoryAdmin)
admin.site.register(GoalsTaxonomy, SimpleHistoryAdmin)

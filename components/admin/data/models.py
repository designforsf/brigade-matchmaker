from django.db import models
from simple_history.models import HistoricalRecords

class SkillsTaxonomy(models.Model):
    name = models.CharField(max_length=254)
    title = models.CharField(max_length=254)
    parent = models.CharField(max_length=254)
    class_name = models.CharField(max_length=254)
    history = HistoricalRecords()

    def __str__(self):
        return self.name

class InterestsTaxonomy(models.Model):
    name = models.CharField(max_length=254)
    title = models.CharField(max_length=254)
    parent = models.CharField(max_length=254)
    class_name = models.CharField(max_length=254)
    history = HistoricalRecords()

    def __str__(self):
        return self.name

class GoalsTaxonomy(models.Model):
    name = models.CharField(max_length=254)
    title = models.CharField(max_length=254)
    parent = models.CharField(max_length=254)
    class_name = models.CharField(max_length=254)
    history = HistoricalRecords()

    def __str__(self):
        return self.name

class ProjectLead(models.Model):
    name = models.CharField(max_length=254)
    github_user_name = models.CharField(max_length=254)
    email_address = models.EmailField(max_length=254)
    slack_name = models.CharField(max_length=254)
    slack_id = models.CharField(max_length=20)
    created = models.DateTimeField(null=True)
    owner = models.ForeignKey('auth.User', related_name='ProjectLeads', on_delete=models.CASCADE)
    history = HistoricalRecords()
    
    def save(self, *args, **kwargs):
        super(ProjectLead, self).save(*args, **kwargs)   

    def __str__(self):
        return self.github_user_name
        return self.name


class Project(models.Model):
    preview = models.BooleanField(default=True) # project will only appear in Project List when set to False
    title = models.CharField(max_length=454, null=True)
    summary = models.CharField(max_length=254)              # should be one or two sentences
    skills_needed = models.ManyToManyField(SkillsTaxonomy)
    learning_opportunities = models.ManyToManyField(GoalsTaxonomy)
    civic_interests = models.ManyToManyField(InterestsTaxonomy)
    # Project Page data
    image_url = models.CharField(max_length=2000)                   # the image url for the project
    description = models.TextField()                                # lengthy description
    project_status = models.CharField(max_length=50)                # "active", "prototype", "beta", etc.
    repository = models.CharField(max_length=2000)                  # github repository
    website = models.CharField(max_length=2000)                     # if there is an app or site the url can go here
    project_lead = models.ForeignKey(ProjectLead, on_delete=models.CASCADE, null=True)   
    slack_channel = models.CharField(max_length=200)                # the slack channel for the project 
    created = models.DateTimeField(null=True)
    history = HistoricalRecords()

    def save(self, *args, **kwargs):
        super(Project, self).save(*args, **kwargs)

    def __str__(self):
        return self.title
        return self.summary
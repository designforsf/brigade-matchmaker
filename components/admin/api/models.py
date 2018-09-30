from django.db import models
from django.contrib.auth.models import User

class SkillsTaxonomy(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=254)
    title = models.CharField(max_length=254)
    parent = models.CharField(max_length=254)

    def save(self, *args, **kwargs):
        super(SkillsTaxonomy, self).save(*args, **kwargs)  

    def __str__(self):
        return self.name

class InterestsTaxonomy(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=254)
    title = models.CharField(max_length=254)
    parent = models.CharField(max_length=254)

    def save(self, *args, **kwargs):
        super(InterestsTaxonomy, self).save(*args, **kwargs)  

    def __str__(self):
        return self.name

class GoalsTaxonomy(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=254)
    title = models.CharField(max_length=254)
    parent = models.CharField(max_length=254)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        super(GoalsTaxonomy, self).save(*args, **kwargs)  

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    github_user_name = models.CharField(max_length=254)
    name = models.CharField(max_length=254)
    email_address = models.EmailField(max_length=254)
    slack_name = models.CharField(max_length=254)
    slack_id = models.CharField(max_length=20)

    def __str__(self):
        return self.github_user_name

class Project(models.Model):
    id = models.AutoField(primary_key=True)
    preview = models.BooleanField(default=True) # project will only appear in Project List when set to False
    title = models.CharField(max_length=454, null=True)
    summary = models.CharField(max_length=254)
    skills_needed = models.ManyToManyField(SkillsTaxonomy)
    learning_opportunities = models.ManyToManyField(GoalsTaxonomy)
    civic_interests = models.ManyToManyField(InterestsTaxonomy)
    pending_tasks = models.CharField(max_length=454, null=True)
    progress_made = models.CharField(max_length=454, null=True)
    additional_info = models.CharField(max_length=454, null=True)
    project_lead = models.ForeignKey(UserProfile, on_delete=models.CASCADE, null=True)   
    slack_channel = models.CharField(max_length=200)

    def save(self, *args, **kwargs):
        super(Project, self).save(*args, **kwargs)

    def __str__(self):
        return self.title
        return self.summary

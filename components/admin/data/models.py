from django.db import models

# test models to make sure djongo working as intended

class SuperAdmin(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    email = models.CharField(max_length=200)
    github_name = models.CharField(max_length=200)

    def __str__(self):
        return self.first_name
        return self.last_name
        return self.email
        return self.github_name

class Test(models.Model):
    string = models.CharField(max_length=200)
    boolean = models.BooleanField()

# prototype projects model

# some things:
# team has anonymous objects that have avatars and usernames
# matchingconfig has goals needed(array), skillsOffered(array), skillsNeeded(array), interests(array)
# needs(array)



# some blank things:
# contact(array)
# matchingDescr has link, repository, progress(array), tasks(array), contactThumbnailUrl, contactRole, contactSlack, contactEmail, summary, and thumbnailUrl

class Team(models.Model):
    avatar = models.CharField(max_length=2000)
    username = models.CharField(max_length=2000)

class Progress(models.Model):
    progress = models.CharField(max_length=2000)

class Tasks(models.Model):
    tasks = models.CharField(max_length=2000)

class GoalsNeeded(models.Model):
    goalsNeeded = models.CharField(max_length=2000)

class SkillsOffered(models.Model):
    skillsOffered = models.CharField(max_length=2000)

class SkillsNeeded(models.Model):
    skillsNeeded = models.CharField(max_length=2000)

class Interests(models.Model):
    interests = models.CharField(max_length=2000)

class Needs(models.Model):
    needs = models.CharField(max_length=2000)

class ThumbNailUrl(models.Model):
    thumbNailUrl = models.CharField(max_length=2000)

class MatchingDescr(models.Model):
    link = models.CharField(max_length=2000)
    repository = models.CharField(max_length=2000)
    progress = models.ManyToManyField(Progress, max_length=2000)
    tasks = models.ManyToManyField(Tasks, max_length=2000)
    contactThumbNailUrl = models.CharField(max_length=2000)
    contactRole = models.CharField(max_length=2000)
    contactSlack = models.CharField(max_length=2000)
    contactEmail = models.CharField(max_length=2000)
    contactName = models.CharField(max_length=2000)
    summary = models.CharField(max_length=2000)
    thumbnailUrl = models.CharField(max_length=2000)

class MatchingConfig(models.Model):
    goalsNeeded = models.ManyToManyField(GoalsNeeded, max_length=2000)
    skillsOffered = models.ManyToManyField(SkillsOffered, max_length=2000)
    skillsNeeded = models.ManyToManyField(SkillsNeeded, max_length=2000)
    interests = models.ManyToManyField(Interests, max_length=2000)
    needs = models.ManyToManyField(Needs, max_length=2000)
    thumbNailUrl = models.ForeignKey(ThumbNailUrl, on_delete=models.CASCADE, max_length=2000)

class Projects(models.Model):
    id = models.CharField(max_length=2000, primary_key=True)
    team = models.ForeignKey(Team, on_delete=models.CASCADE, max_length=2000)
    repository = models.CharField(max_length=2000)
    homepage = models.CharField(max_length=2000)
    description = models.TextField()
    name = models.CharField(max_length=2000)
    matchingDescr = models.ForeignKey(MatchingDescr, on_delete=models.CASCADE, max_length=2000)
    matchingConfig = models.ForeignKey(MatchingConfig, on_delete=models.CASCADE, max_length=2000)

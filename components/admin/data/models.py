from django.db import models

# the taxonomy model will need to appear before the Project model

# prototype project model

class User(models.Model):
    id = models.CharField(max_length=2000, primary_key=True)
    name = models.CharField(max_length=254)
    github_user_name = models.CharField(max_length=254)
    email_address = models.EmailField(max_length=254)
    role = models.CharField(max_length=254)
    slack_id = models.CharField(max_length=20)

    def __str__(self):
        return self.github_user_name
        return self.name


class Project(models.Model):
    id = models.CharField(max_length=2000, primary_key=True)# should be the MongoDB id

    # Project List data commented out lines to be implemented in the future
    name = models.CharField(max_length=454)                # project name
    summary = models.CharField(max_length=200)              # should be one or two sentences
#    skills_needed = models.ForeignKey(Skills, on_delete=models.CASCADE)
#    learning_opportunities = models.ForeignKey(Skills, on_delete=models.CASCADE)
#    civic_interests = models.ForeignKey(Civic, on_delete=models.CASCADE)

    # Project Page data
    image_url = models.CharField(max_length=2000)           # the image url for the project
    description = models.TextField()                        # the blurb for the app, can be long
    project_status = models.CharField(max_length=50)       # "active", "prototype", "beta", etc.
    repository = models.CharField(max_length=2000)          # github repository
    website = models.CharField(max_length=2000)            # if there is an app or site the url can go here
#    team_lead = models.ForeignKey(User, on_delete=models.CASCADE)
    slack_channel = models.CharField(max_length=200)        # the slack channel for the 

    def __str__(self):
        return self.name
        return self.summary
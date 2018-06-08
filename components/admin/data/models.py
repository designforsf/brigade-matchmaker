from django.db import models

# Create your models here.

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

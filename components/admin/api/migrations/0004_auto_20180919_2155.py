# Generated by Django 2.1 on 2018-09-19 21:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20180911_1702'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='project',
            name='created',
        ),
        migrations.RemoveField(
            model_name='project',
            name='description',
        ),
        migrations.RemoveField(
            model_name='project',
            name='image_url',
        ),
        migrations.RemoveField(
            model_name='project',
            name='project_status',
        ),
        migrations.RemoveField(
            model_name='project',
            name='repository',
        ),
        migrations.RemoveField(
            model_name='project',
            name='website',
        ),
        migrations.AddField(
            model_name='project',
            name='additional_info',
            field=models.CharField(max_length=454, null=True),
        ),
        migrations.AddField(
            model_name='project',
            name='pending_tasks',
            field=models.CharField(max_length=454, null=True),
        ),
        migrations.AddField(
            model_name='project',
            name='progress_made',
            field=models.CharField(max_length=454, null=True),
        ),
    ]
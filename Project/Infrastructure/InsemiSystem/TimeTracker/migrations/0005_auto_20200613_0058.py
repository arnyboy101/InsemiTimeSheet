# Generated by Django 3.0.5 on 2020-06-13 00:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('TimeTracker', '0004_choices'),
    ]

    operations = [
        migrations.AlterField(
            model_name='activity',
            name='Project',
            field=models.CharField(max_length=256),
        ),
    ]
# Generated by Django 3.0.6 on 2020-08-07 14:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Time', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='activity',
            name='Leaves_availed',
            field=models.IntegerField(default=None),
        ),
    ]

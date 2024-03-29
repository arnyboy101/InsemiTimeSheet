# Generated by Django 3.0.6 on 2020-08-06 15:03

from django.db import migrations, models
import django_mysql.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Activity',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('employeeId', models.CharField(default=None, max_length=64)),
                ('employeeName', models.CharField(default=None, max_length=256)),
                ('Project_code', models.CharField(default=None, max_length=256)),
                ('Project_name', models.CharField(default=None, max_length=256)),
                ('Manager', models.CharField(default=None, max_length=256)),
                ('Vendor_name', models.CharField(default=None, max_length=256)),
                ('Work_location', models.CharField(default=None, max_length=256)),
                ('Customer_name', models.CharField(default=None, max_length=256)),
                ('Date', models.DateField(default=None)),
                ('Day', models.CharField(default=None, max_length=16)),
                ('Opening_time', models.TimeField(default=None)),
                ('Closing_time', models.TimeField(default=None)),
                ('Total_hours', models.TimeField(default=None)),
                ('Status', models.CharField(default=None, max_length=128)),
                ('Remarks', models.CharField(default=None, max_length=256)),
            ],
        ),
        migrations.CreateModel(
            name='Choices',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('choices', django_mysql.models.ListCharField(models.CharField(max_length=256), max_length=3855, size=15)),
            ],
        ),
    ]

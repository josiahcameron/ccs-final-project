# Generated by Django 4.1.7 on 2023-03-14 00:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('habits', '0002_rename_type_habit_frequency_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='habitmeta',
            name='date_completed',
            field=models.DateField(auto_now_add=True),
        ),
    ]

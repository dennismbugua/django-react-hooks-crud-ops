# Generated by Django 4.1.2 on 2022-10-21 13:23

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Student',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=250)),
                ('subject', models.CharField(max_length=200)),
                ('marks', models.CharField(max_length=350)),
                ('grade', models.CharField(max_length=350)),
            ],
        ),
    ]

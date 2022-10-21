from django.db import models
# Create your models here.


class Student(models.Model):
    name = models.CharField(max_length=250)
    subject = models.CharField(max_length=200)
    marks = models.CharField(max_length=350)
    grade = models.CharField(max_length=350)

    def __str__(self):
        return self.name

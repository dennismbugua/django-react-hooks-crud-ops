from django.contrib import admin
from .models import Student
# Register your models here.


class StudentAdmin(admin.ModelAdmin):
    list = ('name', 'subject', 'marks', 'grade')

    admin.site.register(Student)

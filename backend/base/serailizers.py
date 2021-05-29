from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model= Employee
        fields = '__all__'

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model= Task
        fields = '__all__'

class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model= Report
        fields = '__all__'
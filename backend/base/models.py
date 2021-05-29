from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Employee(models.Model):
    first_name=models.CharField(max_length=200,null=True,blank=True)
    last_name=models.CharField(max_length=200,null=True,blank=True)
    image=models.CharField(max_length=200,null=True,blank=True)
    position=models.CharField(max_length=200,null=True,blank=True)
    manager_id=models.IntegerField(null=True,blank=True,default=0)
    employee_id=models.AutoField(primary_key=True,editable=False)

    def __str__(self):
        return str(self.first_name)+' '+str(self.last_name)

# class EmployeeManagement(models.Model):
#     employee_id = models.ForeignKey(Employee,on_delete=models.SET_NULL,null=True)
#     manager_id=models.IntegerField(primary_key=True,editable=False)
#
#     def __str__(self):
#         return str(self.manager_id)

class Task(models.Model):
    employee_id = models.ForeignKey(Employee,on_delete=models.SET_NULL,null=True)
    text=models.TextField(null=True,blank=True)
    assign_date=models.DateTimeField()
    due_date=models.DateTimeField()
    task_id=models.AutoField(primary_key=True,editable=False)
    def __str__(self):
        return str(self.task_id)
class Report(models.Model):
    employee_id = models.ForeignKey(Employee,on_delete=models.SET_NULL,null=True)
    text=models.TextField(null=True,blank=True)
    report_date=models.DateTimeField()
    report_id=models.AutoField(primary_key=True,editable=False)
    def __str__(self):
        return str(self.report_id)
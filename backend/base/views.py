from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .employees import employees
from .models import *
from .serailizers import *
# Create your views here.

@api_view(['GET'])
def getRoutes(request):
    routes=[
        '/employees',
        '/employees/<id>',
        '/employees/addTask',
        '/employees/addReport',

    ]
    return Response(routes)

@api_view(['GET'])
def getEmployees(request):
    employees=Employee.objects.all()
    serializer=EmployeeSerializer(employees,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getEmployee(request,pk):
    serializer_e={}
    serializer_m={}
    serializer_t={}
    serializer_r={}
    serializer_s={}
    employee=None
    try:
        employee=Employee.objects.get(employee_id=pk)
        serializer_e=EmployeeSerializer(employee,many=False).data
    except:
        None
    try:
        manger=Employee.objects.get(employee_id=employee.manager_id)
        serializer_m=EmployeeSerializer(manger,many=False).data
    except:
        None
    try:
        task=Task.objects.filter(employee_id=pk)
        serializer_t = TaskSerializer(task, many=True).data

    except:
        None
    try:
        report = Report.objects.filter(employee_id=pk)
        serializer_r=ReportSerializer(report,many=True).data
    except:
        None

    try:
        employees=Employee.objects.filter(manager_id=pk)
        serializer_s=EmployeeSerializer(employees,many=True).data
    except:
        None
    res_dict={'employee':serializer_e,'tasks':serializer_t,'reports':serializer_r,'subordinates':serializer_s,'manager':serializer_m}
    return Response(res_dict)

@api_view(['POST'])
def addTask(request):
    data =request.data
    employee=Employee.objects.get(employee_id=data['employee_id'])
    task =Task.objects.create(
        employee_id=employee,
        text=data['text'],
        assign_date=data['assign_date'],
        due_date=data['due_date'],
    )

    serializer=TaskSerializer(task,many=False)
    return Response(serializer.data)

@api_view(['POST'])
def addReport(request):
    data =request.data
    employee=Employee.objects.get(employee_id=data['employee_id'])
    report =Report.objects.create(
        employee_id=employee,
        text=data['text'],
        report_date=data['report_date'],
    )
    serializer=ReportSerializer(report,many=False)
    return Response(serializer.data)
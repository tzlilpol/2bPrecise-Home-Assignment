from django.urls import path
from . import  views

urlpatterns = [
    path('',views.getRoutes,name='routes'),
    path('employees/',views.getEmployees,name='employees'),
    path('employees/<int:pk>/',views.getEmployee,name='employee'),
    path('employees/addTask/',views.addTask,name='addTask'),
    path('employees/addReport/',views.addReport,name='addReport'),
]
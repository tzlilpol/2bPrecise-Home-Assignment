# Generated by Django 3.2.3 on 2021-05-26 16:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0005_employee_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='report',
            name='employee_id',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.employee'),
        ),
        migrations.AlterField(
            model_name='task',
            name='employee_id',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.employee'),
        ),
    ]

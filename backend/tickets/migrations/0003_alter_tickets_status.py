# Generated by Django 5.1.4 on 2024-12-28 03:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tickets', '0002_tickets_created_at_tickets_updated_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tickets',
            name='status',
            field=models.CharField(choices=[('open', 'Open'), ('in_progress', 'In Progress'), ('resolved', 'Resolved')], default='pending', max_length=100),
        ),
    ]

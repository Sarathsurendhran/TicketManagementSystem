from django.db import models
from django.contrib.auth.models import User


class Tickets(models.Model):
    PRIORITY_CHOICES = [
        ("low", "low"),
        ("medium", "Medium"),
        ("high", "High"),
    ]

    STATUS_CHOICES = [
        ("open", "Open"),
        ("in_progress", "In Progress"),
        ("resolved", "Resolved"),
    ]

    title = models.CharField(max_length=50)
    description = models.TextField()
    priority = models.CharField(max_length=100, choices=PRIORITY_CHOICES)
    status = models.CharField(max_length=100, choices=STATUS_CHOICES, default="open")
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title

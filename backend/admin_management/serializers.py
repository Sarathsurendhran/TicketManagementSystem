from tickets.models import Tickets
from rest_framework import serializers


class TicketSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username", read_only=True)
    email = serializers.EmailField(source="user.email", read_only=True)

    class Meta:
        model = Tickets
        fields = "__all__"

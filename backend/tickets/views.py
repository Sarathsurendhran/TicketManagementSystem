from rest_framework import generics
from rest_framework import permissions
from .serializers import UserRegisterSerializer, TicketSerializer
from .models import Tickets
from .permissions import IsOwnerOrAdmin
from django.shortcuts import get_object_or_404


class UserRegistrationView(generics.CreateAPIView):
    """
    POST /register/ - Register a new user
    """

    serializer_class = UserRegisterSerializer
    permission_classes = [permissions.AllowAny]


class TicketCreateView(generics.CreateAPIView):
    serializer_class = TicketSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class TicketListView(generics.ListAPIView):
    queryset = Tickets.objects.all()
    serializer_class = TicketSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = super().get_queryset()
        if not self.request.user.is_staff:
            queryset = queryset.filter(user=self.request.user)
        status = self.request.query_params.get("status")
        priority = self.request.query_params.get("priority")
        if status:
            queryset = queryset.filter(status=status)
        if priority:
            queryset = queryset.filter(priority=priority)
        return queryset


class TicketDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tickets.objects.all()
    serializer_class = TicketSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrAdmin]

    def get_object(self):
        obj = get_object_or_404(self.get_queryset(), pk=self.kwargs["pk"])
        self.check_object_permissions(self.request, obj)
        return obj

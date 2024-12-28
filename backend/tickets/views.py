from rest_framework import generics, status
from rest_framework import permissions
from .serializers import UserRegisterSerializer, TicketSerializer
from .models import Tickets
from .permissions import IsOwnerOrAdmin
from django.shortcuts import get_object_or_404
from .pagination import TicketPagination
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response


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
    serializer_class = TicketSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = TicketPagination

    def get_queryset(self):
        # Fetch all tickets for the logged-in user
        return (
            Tickets.objects.filter(user=self.request.user)
            .select_related("user")
            .order_by("-id")
        )


class TicketDetailView(generics.RetrieveAPIView):
    """
    Optimized API endpoint to retrieve a single ticket.
    """

    serializer_class = TicketSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrAdmin]

    def get_object(self):
        # Fetch the specific ticket directly using the primary key
        ticket_id = self.kwargs["pk"]
        obj = get_object_or_404(Tickets, pk=ticket_id)
        return obj


class TicketUpdateView(generics.UpdateAPIView):
    serializer_class = TicketSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrAdmin]

    def get_queryset(self):
        """
        Limit the queryset to only the specific ticket the user wants to update.
        """
        return Tickets.objects.filter(id=self.kwargs["pk"])

    def perform_update(self, serializer):
        """
        Custom logic before updating. Ensure the ticket's status is 'pending' before allowing the update.
        """
        ticket = self.get_object()
        if ticket.status != "pending":
            raise ValidationError("You can only update tickets with 'pending' status.")

        serializer.save()


class TicketDeleteView(generics.DestroyAPIView):
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrAdmin]

    def delete(self, request, *args, **kwargs):
        try:
            # Retrieve and delete the ticket by primary key
            ticket = Tickets.objects.get(pk=kwargs["pk"])
            ticket.delete()
            return Response(
                {"message": "Ticket deleted successfully."},
                status=status.HTTP_204_NO_CONTENT,
            )
        except Tickets.DoesNotExist:
            return Response(
                {"error": "Ticket not found."}, status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {"error": f"An error occurred: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )






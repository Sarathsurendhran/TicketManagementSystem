from rest_framework import generics
from tickets.models import Tickets
from .serializers import TicketSerializer
from admin_management.permissions import IsSuperUser
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from rest_framework.exceptions import NotFound, ValidationError
from rest_framework.views import APIView
from rest_framework.response import Response


class CustomPagination(PageNumberPagination):
    """
    Custom pagination class for controlling page size and limits.
    """

    page_size = 5
    page_size_query_param = "page_size"
    max_page_size = 10


class GetTicketsView(generics.ListAPIView):
    """
    API view to retrieve a paginated list of all tickets.
    Accessible only by superusers.
    """

    serializer_class = TicketSerializer
    queryset = Tickets.objects.all()
    permission_classes = [IsAuthenticated, IsSuperUser]
    pagination_class = CustomPagination


class UpdateTicketStatus(APIView):
    """
    API view to update the status of a specific ticket.
    Accessible only by superusers.
    """

    permission_classes = [IsAuthenticated, IsSuperUser]

    def patch(self, request, ticket_id):
        """
        Handles PATCH requests to update the ticket status.

        Args:
            request: The HTTP request containing the status data.
            ticket_id: The ID of the ticket to update.

        Raises:
            NotFound: If the ticket with the given ID does not exist.
            ValidationError: If the provided status is invalid.

        Returns:
            Response: A success message with the updated status.
        """
        try:
            ticket = Tickets.objects.get(id=ticket_id)
        except Tickets.DoesNotExist:
            raise NotFound(detail="Ticket not found")

        # Validate and update the status
        status = request.data.get("status")
        if status not in ["open", "in progress", "resolved", "rejected"]:
            raise ValidationError({"status": f'"{status}" is not a valid choice.'})

        ticket.status = status
        ticket.save()

        return Response(
            {"message": "Status updated successfully.", "status": ticket.status}
        )

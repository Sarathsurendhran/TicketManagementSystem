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
    page_size = 5
    page_size_query_param = "page_size"
    max_page_size = 10


class GetTicketsView(generics.ListAPIView):
    serializer_class = TicketSerializer
    queryset = Tickets.objects.all()
    permission_classes = [IsAuthenticated, IsSuperUser]
    pagination_class = CustomPagination


class UpdateTicketStatus(APIView):
    permission_classes = [IsAuthenticated, IsSuperUser]

    def patch(self, request, ticket_id):
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

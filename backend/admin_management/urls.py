from django.urls import path
from admin_management.views import *

urlpatterns = [
  path("get-tickets/",GetTicketsView.as_view()),
  path("update-ticket-status/<int:ticket_id>/",UpdateTicketStatus.as_view()),

]
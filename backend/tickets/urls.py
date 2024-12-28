from django.urls import path
from .views import UserRegistrationView
from rest_framework_simplejwt.views import TokenObtainPairView


from tickets.views import *


urlpatterns = [
    path("register/", UserRegistrationView.as_view()),
    path("login/", TokenObtainPairView.as_view()),
    path("get-tickets/", TicketListView.as_view()),
    path("get-ticket-details/<int:pk>/", TicketDetailView.as_view()),
    path("create-new-ticket/", TicketCreateView.as_view()),
    path("update-ticket/<int:pk>/", TicketUpdateView.as_view()),
    path("delete-ticket/<int:pk>/", TicketDeleteView.as_view()),
]

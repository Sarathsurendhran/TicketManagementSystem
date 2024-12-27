from django.urls import path
from .views import UserRegistrationView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from tickets.views import *


urlpatterns = [
    path("register/", UserRegistrationView.as_view()),
    path("login/", TokenObtainPairView.as_view()),
    path("token/refresh/", TokenRefreshView.as_view()),
    path('tickets/', TicketListView.as_view()),
    path('ticket/<int:pk>/', TicketDetailView.as_view()),
    path('ticket/new/', TicketCreateView.as_view()),
]

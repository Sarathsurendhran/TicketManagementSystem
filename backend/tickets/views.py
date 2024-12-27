from rest_framework import generics
from rest_framework.permissions import AllowAny
from .serializers import UserRegisterSerializer


class UserRegistrationView(generics.CreateAPIView):
    """
    POST /register/ - Register a new user
    """

    serializer_class = UserRegisterSerializer
    permission_classes = [AllowAny]



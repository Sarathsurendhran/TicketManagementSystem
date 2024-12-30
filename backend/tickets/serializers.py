from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Tickets


class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, min_length=8)
    confirm_password = serializers.CharField(
        write_only=True, required=True, min_length=8
    )

    class Meta:
        model = User
        fields = ["username", "password", "confirm_password", "email"]

    def validate(self, attrs):
        # check if password is match
        if attrs["password"] != attrs["confirm_password"]:
            raise serializers.ValidationError({"password": "Password not match"})
        return attrs

    def create(self, validate_data):
        # Remove the password_confirm field before creating the user
        validate_data.pop("confirm_password")
        user = User.objects.create_user(**validate_data)
        return user


class TicketSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username", read_only=True)
    email = serializers.EmailField(source="user.email", read_only=True)

    class Meta:
        model = Tickets
        fields = [
            "id",
            "title",
            "description",
            "priority",
            "status",
            "created_at",
            "username",
            "email",
        ]
        read_only_fields = ["id", "user"]


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Custom serializer for adding extra claims to the JWT token.

    This serializer overrides the `get_token` method to include
    the `is_admin` claim, which is `True` for superusers.
    """

    @classmethod
    def get_token(cls, user):
        """
        Override the `get_token` method to add custom claims.

        Args:
            user (User): The user object for which the token is being generated.

        Returns:
            token (Token): The customized token with additional claims.
        """
        token = super().get_token(user)

        # Add custom claim for superuser status
        token["is_admin"] = user.is_superuser
        token["username"] = user.username
        token["email"] = user.email

        return token

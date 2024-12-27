from rest_framework import serializers
from django.contrib.auth.models import User


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

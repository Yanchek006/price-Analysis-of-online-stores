from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'first_name',
            'last_name',
            'email',
            'is_active',
            'password',
        )

        extra_kwargs = {
            'username': {
                'required': False,
            },
            'first_name': {
                'required': True,
            },
            'last_name': {
                'required': True,
            },
            'email': {
                'required': True,
            },
            'password': {
                'required': False,
                'write_only': True,
            },
            'is_active': {
                'read_only': True,
            },
            'id': {
                'read_only': True,
            },
        }

    def create(self, validated_data):
        try:
            validate_password(validated_data['password'])
        except serializers.ValidationError as exc:
            raise serializers.ValidationError(
                {'password': [exc.detail]}
            )

        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            password=make_password(validated_data['password']),
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
        )

        return user

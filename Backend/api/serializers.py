from .models import Query
from rest_framework import serializers

class ResourceSerializer(serializers.Serializer):
    topic = serializers.CharField()
    language = serializers.CharField()
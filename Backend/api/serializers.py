from .models import Query, Rating
from rest_framework import serializers

class ResourceSerializer(serializers.Serializer):
    topic = serializers.CharField()
    language = serializers.CharField()
    
class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ['resource_url', 'resource_title', 'stars']
from django.shortcuts import render
from .serializers import ResourceSerializer, RatingSerializer, ChatSerializer
from rest_framework import generics, status
from rest_framework.response import Response
from .services import get_resources, chat_with_resources
from .models import Rating
from django.db.models import Avg, Count
# Create your views here.

class ResourceView(generics.GenericAPIView):
    serializer_class = ResourceSerializer
    
    def post(self, request):
        serializer = self.get_serializer(data = request.data)
        serializer.is_valid(raise_exception = True)
        
        topic = serializer.validated_data['topic']
        language = serializer.validated_data['language']
        
        resources = get_resources(topic, language)
        
        return Response({'resources': resources}, status=status.HTTP_200_OK)
    
class RatingView(generics.GenericAPIView):
    serializer_class = RatingSerializer
    
    def post(self, request):
        serializer = self.get_serializer(data = request.data)
        serializer.is_valid(raise_exception = True)
        
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    def get(self, request):
        url = request.query_params.get('url')
        if not url:
            return Response({'error': 'url is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        result = Rating.objects.filter(resource_url=url).aggregate(
            average=Avg('stars'),
            count=Count('id')
        )
        
        
        return Response({'average': result['average'] or 0,'count': result['count']}, status=status.HTTP_200_OK)
    
class ChatView(generics.GenericAPIView):
    serializer_class = ChatSerializer
    
    def post(self, request):
        serializer = self.get_serializer(data = request.data)
        serializer.is_valid(raise_exception = True)
        
        question = serializer.validated_data['question']
        resource = serializer.validated_data['resource']
        
        answer = chat_with_resources(question, resource)
        
        return Response({'answer': answer}, status=status.HTTP_200_OK)

from django.shortcuts import render
from .serializers import ResourceSerializer
from rest_framework import generics, status
from rest_framework.response import Response
from .services import get_resources
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
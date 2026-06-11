from django.urls import path
from .views import ResourceView, RatingView, ChatView

urlpatterns = [
    path('resources/', ResourceView.as_view(), name = 'resources'),
    path('ratings/', RatingView.as_view(), name = 'rating'),
    path('chat/', ChatView.as_view(), name = 'chat')
]
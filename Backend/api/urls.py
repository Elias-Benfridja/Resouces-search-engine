from django.urls import path
from .views import ResourceView, RatingView

urlpatterns = [
    path('resources/', ResourceView.as_view(), name = 'resources'),
    path('ratings/', RatingView.as_view(), name = 'rating'),
]
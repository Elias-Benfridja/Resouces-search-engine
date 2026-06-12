from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.
class Query(models.Model):
    class Language(models.TextChoices):
        ARABIC = 'a', 'arabic'
        FRENCH = 'f', 'french'
        ENGLISH = 'e', 'english'
        AMAZIGH = 'am', 'amazigh'
        TURKISH = 't', 'turkish'
        SPANISH = 'es', 'spanish'
        GERMAN = 'de', 'german'
        PORTUGUESE = 'pt', 'portuguese'
        CHINESE = 'zh', 'chinese'
    topic = models.CharField(max_length=50)
    language = models.CharField(max_length=2, choices=Language.choices)
    results = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)
    
class Rating(models.Model):
    resource_url = models.URLField(max_length=255)
    resource_title = models.CharField(max_length=255)
    stars = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    created_at = models.DateTimeField(auto_now_add=True)
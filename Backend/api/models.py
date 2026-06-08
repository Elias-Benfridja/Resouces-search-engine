from django.db import models

# Create your models here.
class Query(models.Model):
    class Budget(models.TextChoices):
        FREE = 'f', 'free'
        PAID = 'p', 'paid'
        EITHER = 'e', 'either'
    class Language(models.TextChoices):
        ARABIC = 'a', 'arabic'
        FRENCH = 'f', 'french'
        ENGLISH = 'e', 'english'
        AMAZIGH = 'am', 'amazigh'
        TURKISH = 't', 'turkish'
    topic = models.CharField(max_length=50)
    language = models.CharField(max_length=2, choices=Language.choices)
    budget = models.CharField(max_length=1, choices=Budget.choices)
    results = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)
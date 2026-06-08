import os 
import json
from google import genai
from .models import Query
from dotenv import load_dotenv

load_dotenv()

client = genai.Client(api_key=os.environ.get('GEMINI_API_KEY'))


def build_prompt(topic: str, language: str) -> str:
    return f"""
You are a STEM education resource curator.
Return a JSON array of as many high quality learning resources as possible about "{topic}".
All resources must be in {language}.
Include both free and paid resources (courses, videos, articles, research papers, books, websites).

Each resource must have exactly these fields:
- title: string
- url: string (must be a real, working URL)
- type: one of ["video", "article", "course", "research_paper", "book", "website"]
- cost: one of ["free", "paid", "freemium"]
- description: one short sentence explaining why this resource is useful

Return ONLY the JSON array. No markdown, no explanation, no code fences.
Example format:
[
  {{
    "title": "...",
    "url": "...",
    "type": "...",
    "cost": "...",
    "description": "..."
  }}
]
"""

def get_resources(topic: str, language: str) -> list:
    cached = Query.objects.filter(topic = topic.lower(), language = language.lower()).first()
    # Check cache first
    if cached:
        return cached.results
    # Call gemini
    prompt = build_prompt(topic,language)
    try:
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt
        )
    except Exception as e:
        raise Exception(f"Gemini API error: {str(e)}")
    # Clean and parse response
    raw = response.text.strip()
    raw = raw.removeprefix('```json').removeprefix('```').removesuffix('```').strip()
    resources = json.loads(raw)
    # Save cache
    Query.objects.create(
        topic = topic.lower(),
        language = language,
        results = resources,
        budget = 'e'
    )
    return resources
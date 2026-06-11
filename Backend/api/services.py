import os 
import json
import requests
from bs4 import BeautifulSoup
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

def build_prompt_chatbot(question: str, resource: dict) -> str:
    return f"""
You are a helpful assistant. You can ONLY answer questions based on the following resource:

Title: {resource['title']}
URL: {resource['url']}
Type: {resource['type']}
Cost: {resource['cost']}
Description: {resource['description']}
Page Content: {resource['page_content']}

If the question cannot be answered from this resource, say so.

Question: {question}
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

    start = raw.index('[')
    end = raw.rindex(']') + 1
    raw = raw[start:end]

    resources = json.loads(raw)
    # Save cache
    Query.objects.create(
        topic = topic.lower(),
        language = language,
        results = resources,
        budget = 'e'
    )
    return resources

def chat_with_resources(question: str, resource: dict) -> str:
    try:
        resource['page_content'] = fetch_page_content(resource['url'])
    except:
        resource['page_content'] = ''
    
    prompt = build_prompt_chatbot(question, resource)
    
    try:
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt
        )
    except Exception as e:
        raise Exception(f"Gemini API error: {str(e)}")
    
    return response.text
    
def fetch_page_content(url: str) -> str:
    try:
        response = requests.get(url, timeout=3)
        parse = BeautifulSoup(response.content, 'html.parser')
        text = parse.text
        text = ' '.join(text.split())
        return text[:5000]
    except Exception as e:
        raise Exception(f"Url error: {str(e)}")
    
def fetch_search_results(query: str) -> list:
    GOOGLE_API_KEY = os.environ.get('GOOGLE_API_KEY')
    SEARCH_ENGINE_ID = os.environ.get('SEARCH_ENGINE_ID')
    try:
        response = requests.get(f'https://www.googleapis.com/customsearch/v1?key={GOOGLE_API_KEY}&cx={SEARCH_ENGINE_ID}&q={query}')
        parse = response.json()
        return [item['link'] for item in parse['items']]
    except Exception as e:
        raise Exception(f"Url error: {str(e)}")
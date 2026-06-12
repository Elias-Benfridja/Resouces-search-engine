# 🔬 STEM Resource Finder

An AI-powered platform that helps students discover high-quality STEM learning resources in their preferred language.

## What it does

STEM Resource Finder uses Google's Gemini AI to curate learning resources on any STEM topic across multiple languages. Users can search for resources, filter by type and cost, rate resources, ask questions about specific resources, and view their search history — all in one place.

## Tech Stack

- **Frontend:** React + TypeScript + Tailwind CSS (Vite)
- **Backend:** Django + Django REST Framework
- **AI:** Google Gemini 2.5 Flash
- **Page Fetching:** BeautifulSoup + Requests
- **Database:** SQLite (dev) / PostgreSQL (prod)

## Features

- 🌍 Multilingual support ('English', 'French', 'Arabic', 'Amazigh', 'Turkish', 'Spanish', 'German', 'Portuguese', 'Chinese')
- 🆓 Free and paid resources
- 🔍 Filter by resource type and cost
- ⭐ Per-session resource rating system
- 🤖 Per-card AI chatbot with page content fetching
- 🕐 Search history (last 5 searches)
- 📋 Copy resource link
- 💾 Query caching to save API quota

## Running Locally

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Create a `.env` file:
```
SECRET_KEY=your_django_secret_key
GEMINI_API_KEY=your_gemini_api_key
GOOGLE_API_KEY=your_google_api_key
SEARCH_ENGINE_ID=your_search_engine_id
```

```bash
python manage.py migrate
python manage.py runserver
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Known Limitations

- Resources are AI-generated — links should be verified before use
- Amazigh language returns limited results due to low training data availability
- Page content fetching may fail on sites that block automated requests

## Future Improvements

- Full web search integration for real-time resource discovery
- User authentication and saved resource lists
- More language support
- Resource link verification system
- Export results as PDF or CSV
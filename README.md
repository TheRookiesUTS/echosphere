# 🌍 Echosphere - Urban Resilience Digital Twin

> AI-powered platform for urban planning and environmental resilience analysis using NASA Earth observation data.

**NASA Space Apps Challenge 2024**

---

## 🚀 Quick Start

### Prerequisites
- Python 3.13+
- Node.js 18+
- NASA API Key ([Get here](https://api.nasa.gov))
- OpenRouter API Key ([Get here](https://openrouter.ai))

### 1. Clone & Setup
```bash
git clone <repository-url>
cd echosphere-main
```

### 2. Backend Setup
```bash
# Configure environment
cp backend/.env.example backend/.env
# Edit backend/.env with your API keys

# Install dependencies
pip install --target=.venv-packages -r requirements.txt

# Start backend
./start-backend.sh
```

Backend runs on: **http://localhost:8000**

### 3. Frontend Setup
```bash
cd frontend-react
npm install
npm run dev
```

Frontend runs on: **http://localhost:5173**

---

## 📁 Project Structure

```
echosphere-main/
├── backend/              # FastAPI backend server
│   ├── app/
│   │   ├── routers/     # API endpoints
│   │   ├── services/    # Business logic
│   │   └── models/      # Data schemas
│   └── main.py
│
├── frontend-react/       # React frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── store/       # State management (Zustand)
│   │   └── services/    # API client (Axios)
│   └── package.json
│
├── docs/                 # Additional documentation
├── .venv-packages/       # Python dependencies
└── README.md
```

---

## 🎯 Features

### Core Functionality
- **🗺️ Interactive Mapping** - Leaflet.js with multiple base layers
- **🤖 AI Assistant** - DeepSeek-powered urban planning advisor  
- **📊 Environmental Metrics** - Real-time heat, air quality, water stress analysis
- **🎨 Planning Scenarios** - Simulate green infrastructure interventions
- **🛰️ NASA Data Integration** - Earth imagery, EONET events, climate data
- **🏙️ Multi-City Support** - 8+ major cities pre-configured

### Technology Stack

**Backend:**
- FastAPI - Modern async Python web framework
- OpenAI SDK - AI integration via OpenRouter
- httpx - Async HTTP client
- Pydantic - Data validation

**Frontend:**
- React 18 - UI framework
- Vite - Build tool with HMR
- Tailwind CSS - Utility-first styling
- Zustand - State management
- Leaflet.js - Interactive maps
- Axios - HTTP client

---

## 🔌 API Endpoints

**AI Services:**
- `POST /api/chat` - AI chatbot
- `POST /api/analyze-area` - Area analysis

**NASA Services:**
- `GET /api/nasa/imagery` - Earth imagery
- `GET /api/nasa/eonet/events` - Natural disasters  
- `GET /api/nasa/power/climate` - Climate data

**Utility:**
- `GET /api/health` - Health check
- `GET /docs` - Interactive API documentation

---

## 🛠️ Development

### Backend Commands
```bash
# Start server
cd backend
python main.py

# View logs
tail -f /tmp/echosphere-backend.log
```

### Frontend Commands
```bash
cd frontend-react

# Development
npm run dev

# Production build
npm run build

# Preview production
npm run preview
```

### Stopping Servers
```bash
pkill -f "python3 main.py"
pkill -f "npm run dev"
```

---

## 📚 Documentation

- **[API Documentation](http://localhost:8000/docs)** - Interactive Swagger UI
- **[Backend Guide](backend/README.md)** - Detailed backend documentation
- **[Frontend Guide](frontend-react/README.md)** - Frontend architecture
- **[Tech Stack](frontend-react/TECH_STACK.md)** - Technology details
- **[Migration Guide](docs/MIGRATION_GUIDE.md)** - Vanilla JS → React migration

---

## 🧪 Testing

```bash
# Test backend
curl http://localhost:8000/api/health

# Test API endpoints
open http://localhost:8000/docs

# Check ports
ss -tlnp | grep -E ":(8000|5173)"
```

---

## 🚢 Deployment

### Backend
```bash
# Production server with Gunicorn
gunicorn backend.main:app -w 4 -k uvicorn.workers.UvicornWorker
```

### Frontend
```bash
cd frontend-react
npm run build
# Deploy dist/ folder to static hosting (Vercel, Netlify, etc.)
```

---

## 🐛 Troubleshooting

### Backend not starting?
```bash
# Check Python version
python3 --version  # Should be 3.13+

# Verify API keys
cat backend/.env

# Check logs
tail -f /tmp/echosphere-backend.log
```

### Frontend blank page?
```bash
# Hard refresh browser
Ctrl + Shift + R

# Clear browser cache
Ctrl + Shift + Delete

# Check console (F12) for errors
```

### Port already in use?
```bash
# Change backend port
uvicorn main:app --port 8001

# Change frontend port
npm run dev -- --port 5174
```

---

## 📊 Project Stats

- **Backend:** ~2,000 lines of Python
- **Frontend:** ~2,500 lines of React/JSX
- **Components:** 20+ reusable React components
- **API Endpoints:** 6 main endpoints
- **Cities:** 8 pre-configured locations
- **Bundle Size:** ~200KB gzipped

---

## 🤝 Contributing

This is a NASA Space Apps Challenge project. Contributions welcome!

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📄 License

Built for NASA Space Apps Challenge 2024

---

## 🙏 Acknowledgments

- **NASA** - Earth observation data and APIs
- **OpenRouter** - AI model access  
- **OpenStreetMap** - Map data and geocoding
- **Open Source Community** - Amazing libraries

---

## 🔗 Links

- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:8000
- **API Docs:** http://localhost:8000/docs
- **NASA API:** https://api.nasa.gov
- **OpenRouter:** https://openrouter.ai

---

**Built with ❤️ for NASA Space Apps Challenge**

🛰️ Powered by NASA Earth Observation Data  
🤖 Enhanced with AI Technology  
🌍 For Sustainable Urban Development

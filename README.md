# ChronoChain AI v2.0
### Hybrid ML + LLM Supply Chain Disruption Prediction Platform

> A research-grade, full-stack AI system that predicts supply chain disruptions using a fusion of machine learning, LLM reasoning, time-series analysis, and real-time news intelligence.

---

## What It Does

ChronoChain AI monitors 15 global suppliers across 6 regions and predicts the probability of supply chain disruptions before they happen. It combines:

- **ML Ensemble** (XGBoost + Gradient Boosting) trained on time-series metrics
- **LLM Reasoning Layer** that analyzes news headlines and supplier metrics to generate natural language risk explanations
- **Hybrid Fusion** — weighted combination of ML + LLM scores into a single calibrated probability
- **Real-time alerts** when risk exceeds configurable thresholds
- **Interactive simulation** of events like port shutdowns, floods, strikes, and wars

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15, Tailwind CSS, Framer Motion, Recharts |
| Backend | FastAPI (Python 3.14), Uvicorn |
| ML Models | XGBoost + Gradient Boosting ensemble, Platt/isotonic calibration |
| LLM Layer | Local rule-based reasoning (+ optional Ollama / OpenAI) |
| NLP | sentence-transformers (all-MiniLM-L6-v2), TF-IDF fallback |
| Caching | In-memory TTL cache (Redis-swappable) |
| Scheduler | Async background task (precomputes every 120s) |
| Realtime | WebSockets (live risk updates + alerts) |
| Database | PostgreSQL via SQLAlchemy async (optional) |
| Export | PDF reports via ReportLab |

---

## Project Structure

```
DisruptIQ/
├── frontend/                        # Next.js App
│   ├── app/
│   │   ├── page.tsx                 # Dashboard
│   │   ├── forecast/page.tsx        # Hybrid AI Forecast
│   │   ├── news/page.tsx            # News Intelligence
│   │   ├── simulate/page.tsx        # Event Simulation
│   │   ├── geo/page.tsx             # Geo Risk Map
│   │   ├── alerts/page.tsx          # Alert Center
│   │   ├── insights/page.tsx        # Model Insights
│   │   └── evaluation/page.tsx      # Backtesting & Evaluation
│   ├── components/
│   │   ├── layout/Sidebar.tsx
│   │   ├── layout/TopBar.tsx
│   │   └── ui/                      # Card, GaugeMeter, RiskBadge, etc.
│   └── lib/
│       ├── api.ts                   # Typed API client
│       ├── websocket.ts             # WS client with auto-reconnect
│       └── utils.ts
│
├── backend/                         # FastAPI App
│   ├── app/
│   │   ├── main.py                  # Entry point, lifespan, routers
│   │   ├── config.py                # Re-exports from core/config.py
│   │   ├── database.py              # Async SQLAlchemy engine
│   │   ├── api/
│   │   │   ├── predict.py           # POST /predict
│   │   │   ├── risks.py             # GET /top-risks
│   │   │   ├── news.py              # GET /news, /news/summary
│   │   │   ├── simulate.py          # POST /simulate
│   │   │   ├── metrics.py           # GET /metrics, /dashboard/stats
│   │   │   ├── alerts.py            # GET /alerts, POST /alerts/{id}/acknowledge
│   │   │   ├── geo.py               # GET /geo-risk
│   │   │   ├── evaluation.py        # GET /evaluation/report
│   │   │   ├── websocket.py         # WS /ws
│   │   │   └── export.py            # GET /export/pdf
│   │   ├── core/
│   │   │   ├── config.py            # All settings + feature toggles
│   │   │   ├── cache.py             # In-memory TTL cache
│   │   │   └── scheduler.py         # Background precompute task
│   │   ├── ml/
│   │   │   ├── model.py             # XGBoost + GB ensemble, calibration
│   │   │   ├── feature_engineering.py  # Rolling features, embeddings
│   │   │   └── synthetic_data.py    # Synthetic data generator
│   │   ├── models/
│   │   │   ├── db_models.py         # SQLAlchemy ORM models
│   │   │   └── schemas.py           # Pydantic request/response schemas
│   │   └── services/
│   │       ├── prediction_service.py   # Hybrid prediction orchestrator
│   │       ├── llm_service.py          # LLM reasoning layer
│   │       ├── fusion_service.py       # ML + LLM weighted fusion
│   │       ├── alert_service.py        # Threshold alerts + history
│   │       └── news_service.py         # News feed + sentiment
│   ├── scripts/
│   │   ├── init_db.py               # Create PostgreSQL tables
│   │   └── seed_data.py             # Seed synthetic data to DB
│   └── requirements.txt
│
├── data/
│   └── sample_supply_chain.csv      # Sample dataset (500 rows)
└── README.md
```

---

## Quick Start

### Prerequisites
- Python 3.11+ (installed via `py` launcher on Windows)
- Node.js 18+
- PostgreSQL 15+ *(optional — app works without it)*

---

### 1. Start the Backend

```bash
cd backend

# Install dependencies (first time only)
py -m pip install -r requirements.txt

# Start server
py -m uvicorn app.main:app --reload --port 8000
```

On first run, the model trains automatically on synthetic data (~15 seconds). Subsequent starts load from the saved checkpoint instantly.

---

### 2. Start the Frontend

```bash
cd frontend

# Install dependencies (first time only)
npm install

# Start dev server
npm run dev
```

---

### 3. Open the App

| Service | URL |
|---|---|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:8000 |
| API Docs (Swagger) | http://localhost:8000/docs |

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/predict` | Hybrid ML+LLM disruption forecast |
| GET | `/top-risks` | Ranked supplier risk list |
| GET | `/news` | Processed news signals |
| GET | `/news/summary` | Aggregated sentiment stats |
| POST | `/simulate` | What-if event simulation |
| GET | `/metrics` | Model evaluation metrics |
| GET | `/dashboard/stats` | Dashboard summary data |
| GET | `/geo-risk` | Supplier risk with lat/lng |
| GET | `/alerts` | Alert history |
| GET | `/alerts/stats` | Alert counts |
| POST | `/alerts/{id}/acknowledge` | Acknowledge an alert |
| GET | `/evaluation/report` | Full backtesting report |
| GET | `/export/pdf` | Download PDF risk report |
| WS | `/ws` | Real-time risk updates |
| GET | `/health` | Health check |
| GET | `/config` | Current configuration |

---

## Hybrid AI Architecture

```
Time-Series Data          News Headlines
      │                        │
      ▼                        ▼
Feature Engineering     Sentiment Analysis
(rolling stats,         (keyword extraction,
 lag features,           lexicon scoring)
 trend features)              │
      │                        ▼
      ▼                  LLM Reasoning Layer
ML Ensemble              (local rule-based /
(XGBoost + GB +           Ollama / OpenAI)
 Logistic Regression)         │
      │                        │
      ▼                        ▼
  ml_score (0-1)         llm_score (0-1)
      │                        │
      └──────────┬─────────────┘
                 ▼
          Fusion Layer
       (65% ML + 35% LLM)
                 │
                 ▼
        risk_score (0-1)
     + natural language explanation
     + confidence interval
     + feature importance
```

---

## Configuration

All settings are in `backend/app/core/config.py` and can be overridden via a `.env` file in the `backend/` directory.

```env
# LLM Settings
LLM_ENABLED=true
LLM_PROVIDER=local          # local | ollama | openai
LLM_MODEL=mistral
OPENAI_API_KEY=sk-...        # only if using openai
OLLAMA_BASE_URL=http://localhost:11434

# Fusion Weights
ML_WEIGHT=0.65
LLM_WEIGHT=0.35

# Alert Thresholds
ALERT_THRESHOLD=0.70
CRITICAL_THRESHOLD=0.85

# Cache TTLs (seconds)
TOP_RISKS_TTL=120
PREDICTION_TTL=30

# Scheduler
SCHEDULER_INTERVAL_SECONDS=120

# Database (optional)
DATABASE_URL=postgresql+asyncpg://postgres:password@localhost:5432/chronochain
SYNC_DATABASE_URL=postgresql://postgres:password@localhost:5432/chronochain
```

### Enable Ollama (local LLM)

1. Install Ollama from [ollama.ai](https://ollama.ai)
2. Run `ollama pull mistral`
3. Set `LLM_PROVIDER=ollama` in `.env`
4. Restart the backend

---

## ML Pipeline Details

### Training
- **Data**: 15 suppliers × 365 days = 5,475 time-series records
- **Split**: Strict temporal — 70% train / 15% val / 15% test (no data leakage)
- **Features**: 60+ engineered features (rolling means/std/max at 3/7/14-day windows, lag features, trend features)
- **Models**: XGBoost + Gradient Boosting + Logistic Regression baseline
- **Calibration**: Platt scaling (sigmoid) + isotonic regression
- **Ensemble**: Average of all three calibrated models

### Evaluation Metrics
| Metric | Description |
|---|---|
| Brier Score | Probabilistic accuracy (lower = better) |
| AUC-ROC | Discrimination ability |
| ECE | Expected Calibration Error |
| Precision@10 | Accuracy on top 10% highest-risk predictions |
| Brier Skill Score | Improvement over climatology baseline |
| Log Loss | Cross-entropy loss |

### Backtesting
Walk-forward validation across 5 temporal windows (50%→60%, 60%→70%, etc.) — strictly no future data used in training.

---

## Pages

| Page | Description |
|---|---|
| **Dashboard** | Risk score cards, 30-day trend chart, regional heatmap, top-10 supplier table |
| **Forecast** | Hybrid AI prediction with gauge meter, ML/LLM score breakdown, AI explanation card |
| **News Intel** | Live ticker, sentiment filtering, keyword highlighting, risk signal strength |
| **Simulate** | 10 event types, severity/duration controls, cascade effects, affected supplier table |
| **Geo Risk** | SVG world map with animated risk dots, region filter, supplier coordinates table |
| **Alerts** | Threshold-based alert history, severity badges, acknowledge button, auto-refresh |
| **Model Insights** | Calibration curve, feature importance chart, time-series vs NLP breakdown |
| **Evaluation** | Backtesting results, ML vs Hybrid comparison, Brier Skill Score, model AUC chart |

---

## Database Setup (Optional)

The app runs fully without PostgreSQL using synthetic in-memory data. To enable persistence:

```bash
# 1. Create database
psql -U postgres -c "CREATE DATABASE chronochain;"

# 2. Create tables
cd backend
py scripts/init_db.py

# 3. Seed data
py scripts/seed_data.py
```

---

## Sample Dataset

`data/sample_supply_chain.csv` — 58 rows covering 10 suppliers with:
- Lead time, inventory level, order quantity
- On-time delivery rate, defect rate, transportation cost
- Demand variability, disruption label (binary)

---

## WebSocket Events

Connect to `ws://localhost:8000/ws` to receive real-time updates:

```json
{
  "type": "risk_update" | "alert",
  "timestamp": "2026-04-26T13:08:44",
  "supplier": "Apex Electronics",
  "event": "Risk score updated",
  "current_risk": 0.72,
  "risk_delta": 0.05,
  "alert": true,
  "severity": "high",
  "message": "HIGH: Apex Electronics has 72% disruption probability"
}
```

---

## Research Notes

- **No data leakage**: All splits are strictly time-based. The model never sees future data during training.
- **Probability calibration**: Both Platt scaling and isotonic regression are applied to ensure predicted probabilities match empirical frequencies.
- **Foresight learning**: Input features at time `t` predict disruption at time `t+1`, not `t`.
- **Hybrid fusion**: The weighted ensemble of ML + LLM is configurable and can be tuned per use case.
- **LLM fallback**: If Ollama/OpenAI is unavailable, the system falls back to a deterministic rule-based reasoning engine that always produces valid outputs.

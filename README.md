
# 🐄 Mera Maweshi - میرا مویشی

> An AI-powered livestock disease diagnosis app for rural farmers in Pakistan.

Mera Maweshi lets a farmer describe their animal's symptoms in **Urdu or English** and receive an AI-generated disease diagnosis — no vet visit required. 

---

## ✨ Features

- 🌐 **Multilingual** — English and Urdu
- 🤖 **Dual AI Diagnosis** — A scikit-learn model trained on real veterinary case data runs alongside a Groq-hosted LLM (Llama 3.3 70B), so results can be cross-checked instead of trusted blindly
- 🧪 **Differential Diagnosis** — Shows the model's top-3 most likely diseases, not just the top pick
- 🩺 **Symptom Picker** — Tap-to-select symptoms across organ systems, filtered by animal/age/sex
- 📍 **Location-aware** — Collects Province, District & Tehsil for regional outbreak tracking
- 🩹 **First Aid Guidance** — Practical, translated first-aid steps for each diagnosis
- 📋 **Diagnosis History** — Tracks past diagnoses with animal, date, and recovery status
- 🏥 **Urgency Flagging** — Highlights when a diagnosis warrants immediate veterinary attention
---

## 📱 Mockups

### Engliah Mockups

<img width="242" height="449" alt="image" src="https://github.com/user-attachments/assets/482073fa-7c6a-4c9a-a52c-93d1e626ed3d" />
<img width="241" height="461" alt="image" src="https://github.com/user-attachments/assets/47f9af1b-2133-4765-b46d-2365d1c60e8b" />
<img width="236" height="455" alt="image" src="https://github.com/user-attachments/assets/5fd1109c-849a-458e-a952-878b4401eb74" />
<img width="247" height="456" alt="image" src="https://github.com/user-attachments/assets/e30f055b-dd16-4a4c-b727-f58e290a43af" />
<img width="247" height="461" alt="image" src="https://github.com/user-attachments/assets/a4a03a38-8797-4425-85a6-63870bade541" />
<img width="244" height="456" alt="image" src="https://github.com/user-attachments/assets/73c1719a-c6d5-4922-8283-91bc63ff8e62" />
<img width="245" height="458" alt="image" src="https://github.com/user-attachments/assets/7cb12b8c-7060-4580-853d-09bdf736dde5" />


### Urdu Mockups


---
 
## 🧠 Tech Stack
 
| Layer | Technology | Purpose |
|---|---|---|
| Mobile App | React Native (Expo Router, Expo SDK 54) | Cross-platform Android/iOS/web app with RTL & Urdu support |
| Backend API | FastAPI (Python) | REST API connecting the mobile app to both diagnosis sources |
| Trained Model | scikit-learn `RandomForestClassifier` | Classifier trained on the Maweshi dataset (animal, sex, age, symptoms → disease) |
| LLM | Groq API — Llama 3.3 70B Versatile | Independent diagnosis for comparison against the trained model, constrained to the model's disease vocabulary |
| Database | SQLAlchemy — SQLite (local) / PostgreSQL (production) | Farmer profiles and diagnosis history |
| Hosting | Render | FastAPI + trained model hosted online so the app can reach it from anywhere |

---

## 📊 Dataset

#### Maweshi Raw Dataset:

- 810 clinical cases
- 4 animals: Goat (292), Buffalo (213), Cattle (201), Sheep (104)
- 37 diseases: including Worm Infestation(132), Pyrexia(85), Theileriosis(68), Mastitis(68), FMD(56), Haemorrhagic Septicaemia, and more
- 81 symptom columns per case: scored as `0` (absent), `0.3` (mild), `0.9` (strong)
- Each entry includes: `Animal`, `Sex`, `Age Range`, `Breed`, `Report Date`, `Symptoms`, `Disease ID`, `Disease Name`

#### Processed Maweshi Dataset:

- 84 symptoms : 81 + 3 (cough, fever, diarrhoea distribution into mild and severe each) -> all binary
- Each entry includes: `Animal`, `Sex`, `Age Range`, `Symptoms`, `Disease Name`

---

## 📁 Project Structure

```
app/          Expo Router screens (index, language, registration, home, symptoms, result, history)
components/   Shared UI components (UrduText, haptic tab bar, themed primitives)
lib/          API clients (diagnosisApi, farmerApi), device ID, static Pakistan/symptom data
constants/    Theme tokens
backend/
  main.py               FastAPI app: /api/diagnose, /api/farmers, /api/diagnoses, /api/health
  app/db.py             SQLite/Postgres setup
  app/models.py         SQLAlchemy models (Farmer, Diagnosis)
  app/schemas.py        Pydantic request/response schemas
  app/disease_reference.py   Curated EN/UR disease info + first-aid fallback text
  train_model.py        Trains & serializes the Random Forest classifier
  model/                 Serialized pipeline, label encoder, symptom columns, metrics
previous_work/          Earlier fine-tuning exploration, Sobaina's part
```

---

## 🛣️ Roadmap

- [x] UI mockups (English and Urdu)
- [x] React Native mobile app
- [x] FastAPI backend server
- [x] Trained diagnosis model (Random Forest, 96% accuracy)
- [x] LLM diagnosis path (Groq/Llama 3.3) with Urdu validation and disease-vocabulary guardrails
- [x] Farmer profiles & diagnosis history (SQLite locally, Postgres in production)
- [x] Frontend + backend integration
- [x] Backend deployed (Render)
- [ ] Overall UI
- [ ] Automated tests (backend + app)

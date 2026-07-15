
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

### English Mockups

<img width="720" height="1600" alt="1" src="https://github.com/user-attachments/assets/36dd9777-7aa9-4c9a-850b-48b6087680ab" />
<img width="720" height="1600" alt="2" src="https://github.com/user-attachments/assets/32f7a0dd-2da3-4f53-8f18-74374347bde5" />
<img width="720" height="1600" alt="3" src="https://github.com/user-attachments/assets/fdfc5cb6-a578-4d5f-9eaa-4ac34121e0ce" />



### Urdu Mockups
<img width="720" height="1600" alt="1" src="https://github.com/user-attachments/assets/c799886a-02e9-40ab-ae60-d73dd29b6c40" />
<img width="720" height="1600" alt="2" src="https://github.com/user-attachments/assets/d23a8d99-69ad-45ea-ac16-2c36f79accf8" />
<img width="720" height="1600" alt="4" src="https://github.com/user-attachments/assets/fc63ca35-7aa6-4435-b8ca-0e90ec1a0796" />


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

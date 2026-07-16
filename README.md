
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

<img width="220" height="477" alt="1" src="https://github.com/user-attachments/assets/36dd9777-7aa9-4c9a-850b-48b6087680ab" />
<img width="220" height="477" alt="2" src="https://github.com/user-attachments/assets/32f7a0dd-2da3-4f53-8f18-74374347bde5" />
<img width="220" height="477" alt="3" src="https://github.com/user-attachments/assets/fdfc5cb6-a578-4d5f-9eaa-4ac34121e0ce" />
<img width="220" height="477" alt="16" src="https://github.com/user-attachments/assets/3f92638f-7be0-4c0d-8edf-ccc851f25f78" />
<img width="220" height="477" alt="8" src="https://github.com/user-attachments/assets/6d0714de-2970-4c01-bd8a-3170b4ba296a" />
<img width="220" height="477" alt="12" src="https://github.com/user-attachments/assets/91b13729-ff18-4eda-82a7-a982a29fb7ff" />
<img width="220" height="477" alt="13" src="https://github.com/user-attachments/assets/cac2228d-1265-4bc4-9e67-ff330390acfd" />
<img width="220" height="477" alt="14" src="https://github.com/user-attachments/assets/4d88e42b-f366-43a7-aad2-58f3b186af6f" />

### Urdu Mockups
<img width="220" height="477" alt="1" src="https://github.com/user-attachments/assets/c799886a-02e9-40ab-ae60-d73dd29b6c40" />
<img width="220" height="477" alt="2" src="https://github.com/user-attachments/assets/d23a8d99-69ad-45ea-ac16-2c36f79accf8" />
<img width="220" height="477" alt="4" src="https://github.com/user-attachments/assets/fc63ca35-7aa6-4435-b8ca-0e90ec1a0796" />
<img width="220" height="477" alt="17" src="https://github.com/user-attachments/assets/fe5ef0d9-4ba6-4d92-a718-0eb56ab5d0fd" />
<img width="220" height="477" alt="9" src="https://github.com/user-attachments/assets/bf4bb010-d484-4716-9c56-ae574e2960ba" />
<img width="220" height="477" alt="10" src="https://github.com/user-attachments/assets/862124f2-bb19-4947-bf7f-b66d4c37d094" />
<img width="220" height="477" alt="11" src="https://github.com/user-attachments/assets/43e545ad-b22e-474a-9e9b-48e5a29a2916" />
<img width="220" height="477" alt="15" src="https://github.com/user-attachments/assets/2c21f8e9-691e-4b47-bf60-c16c5afcc4d6" />


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

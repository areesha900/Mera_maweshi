
# 🐄 Mera Maweshi - میرا مویشی

> An AI-powered livestock disease diagnosis app for rural farmers in Pakistan.

Mera Maweshi lets a farmer describe their animal's symptoms in **Urdu language** and receive an AI-generated disease diagnosis - no vet visit required.

---

## ✨ Features

- 🌐 **Multilingual** — English and Urdu
- 🤖 **AI Diagnosis** — Fine-tuned LLM trained on livestock disease data
- 🩺 **Symptom Picker** — Tap-to-select symptoms (respiratory, digestive, skin, musculoskeletal, urinary, reproductive systems)
- 🔄 **Auto-translation** — Detects language, translates to English for model, translates response back
- 📍 **Location-aware** — Collects Province, District & Tehsil for regional outbreak tracking
- 🧠 **Conversation memory** — Remembers context within a session
- 📋 **Diagnosis History** — Tracks past diagnoses with animal, date, and recovery status
- 📶 **Offline-first** — Works with poor rural connectivity, syncs when internet return

---

## 📱 Mockups

<img width="242" height="449" alt="image" src="https://github.com/user-attachments/assets/482073fa-7c6a-4c9a-a52c-93d1e626ed3d" />
<img width="241" height="461" alt="image" src="https://github.com/user-attachments/assets/47f9af1b-2133-4765-b46d-2365d1c60e8b" />
<img width="236" height="455" alt="image" src="https://github.com/user-attachments/assets/5fd1109c-849a-458e-a952-878b4401eb74" />
<img width="247" height="456" alt="image" src="https://github.com/user-attachments/assets/e30f055b-dd16-4a4c-b727-f58e290a43af" />
<img width="247" height="461" alt="image" src="https://github.com/user-attachments/assets/a4a03a38-8797-4425-85a6-63870bade541" />
<img width="244" height="456" alt="image" src="https://github.com/user-attachments/assets/73c1719a-c6d5-4922-8283-91bc63ff8e62" />
<img width="245" height="458" alt="image" src="https://github.com/user-attachments/assets/7cb12b8c-7060-4580-853d-09bdf736dde5" />

---
 
## 🧠 Tech Stack
 
| Layer | Technology | Purpose |
|---|---|---|
| Mobile App | React Native | Cross-platform Android/iOS app with RTL & Urdu support |
| Backend API | FastAPI (Python) | REST API connecting the mobile app to the AI model |
| Hosting | Remote Server (Cloud) |  FastAPI + AI model hosted online so the app can reach it from anywhere |
| LLM | OpenChat 3.5 (QLoRA fine-tuned) | Core disease diagnosis model, consistent with prior research |
| Fine-Tuning | QLoRA (LoRA + 4-bit quantization) | Adapter-based fine-tuning on livestock disease data |
| RAG | ChromaDB | Persistent vector search over the disease knowledge base |
| Translation | Meta NLLB-200 + Google Translate fallback | Urdu - offline-first, cloud fallback |
| Database | Firebase Firestore | Farmer profiles, diagnosis history, offline sync |
 
---

## ⚙️ AI Pipeline

```
Farmer Input (symptom tap)
      ↓
Language Detection
      ↓
Translate → English (NLLB-200 / Google Translate fallback)
      ↓
ChromaDB Vector Search (disease knowledge base)
      ↓
LLM Inference (openchat 3.5, QLoRA fine-tuned)
      ↓
Translate Response → Farmer's Language
      ↓
Display Diagnosis + Confidence Score + First-Aid Advice
```

---

## 📊 Dataset

- 810 clinical cases
- 4 animals: Goat (292), Buffalo (213), Cattle (201), Sheep (104)
- 37 diseases: including Worm Infestation(132), Pyrexia(85), Theileriosis(68), Mastitis(68), FMD(56), Haemorrhagic Septicaemia, and more
- 81 symptom columns per case: scored as `0` (absent), `0.3` (mild), or `0.9` (strong)
- Each entry includes: `Animal`, `Sex`, `Age Range`, `Breed`, `Report Date`, `Symptoms`, `Disease ID`, `Disease Name`

---

## 🛣️ Roadmap

- [x] AI model fine-tuning (QLoRA)
- [x] Language detection & translation pipeline
- [x] Urdu UI mockups
- [ ] FastAPI backend server
- [ ] React Native mobile app
- [ ] Full RAG pipeline (ChromaDB)
- [ ] Farmer database & profile management (Firebase Firestore)

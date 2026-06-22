
# 🐄 Mera Maweshi - میرا مویشی

> An AI-powered livestock disease diagnosis app for rural farmers in Pakistan.

Mera Maweshi lets a farmer describe their animal's symptoms in **Urdu or their local language** and receive an AI-generated disease diagnosis — no vet visit required. Built for low-literacy users with large buttons, Urdu-first UI, and multilingual support.

---

## 📱 Screenshots

> <img width="866" height="430" alt="Screenshot 2026-06-22 223114" src="https://github.com/user-attachments/assets/325278fa-dc00-42ec-8d56-84a10eeb0fe9" />


| Splash Screen | Home Menu | Registration | Diagnosis |
|---|---|---|---|
| میرا مویشی logo | 3 big action buttons | Farmer details form | Symptom input |

---

## ✨ Features

- 🌐 **Multilingual** — Urdu-first, with support for Punjabi, Sindhi, and more
- 🤖 **AI Diagnosis** — Fine-tuned LLM (OpenChat 3.5) trained on livestock disease data
- 💬 **Natural language input** — Farmer types symptoms in plain Urdu
- 🔄 **Auto-translation** — Detects language, translates to English for model, translates response back
- 📍 **Location-aware** — Collects Tehsil & Union Council for regional outbreak tracking
- 🧠 **Conversation memory** — Remembers context within a session

---

## 🏗️ Project Structure

```
mera-maweshi/
├── app/                  # React Native mobile app (in development)
├── backend/              # FastAPI backend server (in development)
├── model/
│   ├── VetLLM.ipynb      # Researcher's fine-tuning notebook (last summer)
│   └── animal_disease_dataset.csv
├── docs/
│   └── StepbyStepArchitectureGuide.pdf
└── README.md
```

---

## 🧠 Tech Stack

| Layer | Technology |
|---|---|
| Mobile App | React Native / Flutter |
| Backend API | FastAPI (Python) |
| AI Model | OpenChat 3.5 (7B) + LoRA fine-tuning |
| Quantization | 4-bit (BitsAndBytes) |
| Vector Search | FAISS + SentenceTransformer |
| Language Detection | `langdetect` |
| Translation | `deep_translator` (Google Translate) |
| Database | Firebase / PostgreSQL |

---

## ⚙️ AI Pipeline

```
Farmer Input (Urdu)
      ↓
Language Detection
      ↓
Translate → English
      ↓
FAISS Vector Search (disease knowledge base)
      ↓
LLM Inference (fine-tuned OpenChat 3.5)
      ↓
Translate Response → Farmer's Language
      ↓
Display Diagnosis on App
```

## 🛣️ Roadmap

- [x] AI model fine-tuning (LoRA)
- [x] Language detection & translation pipeline
- [x] Urdu UI mockups
- [ ] FastAPI backend server
- [ ] React Native mobile app
- [ ] Full RAG pipeline (FAISS integration)
- [ ] Voice input (Urdu speech-to-text)
- [ ] Offline mode
- [ ] Farmer database & profile management


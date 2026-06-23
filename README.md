
# 🐄 Mera Maweshi - میرا مویشی

> An AI-powered livestock disease diagnosis app for rural farmers in Pakistan.

Mera Maweshi lets a farmer describe their animal's symptoms in **Urdu or their local language** and receive an AI-generated disease diagnosis — no vet visit required. Built for low-literacy users with large buttons, Urdu-first UI, and multilingual support.

---

## 📱 Screenshots

### Previous
> <img width="866" height="430" alt="Screenshot 2026-06-22 223114" src="https://github.com/user-attachments/assets/325278fa-dc00-42ec-8d56-84a10eeb0fe9" />

### Updated
<img width="725" height="457" alt="Screenshot 2026-06-23 125337" src="https://github.com/user-attachments/assets/c630c54d-a001-4cb8-b7d4-faddd6f6c0e1" />
<img width="727" height="455" alt="Screenshot 2026-06-23 125347" src="https://github.com/user-attachments/assets/841c24ec-79a0-4a56-a12f-e883efe71ecb" />
<img width="720" height="456" alt="Screenshot 2026-06-23 125406" src="https://github.com/user-attachments/assets/14946d24-c6a1-4fcc-8c14-88f35f451bd9" />




---

## ✨ Features

- 🌐 **Multilingual** — English, Urdu, Punjabi, Sindhi, and more
- 🤖 **AI Diagnosis** — Fine-tuned LLM trained on livestock disease data
- 💬 **Natural language input** — Farmer types or speaks symptoms in their language
- 🎤 **Voice input** — Urdu speech-to-text for low-literacy users
- 🔄 **Auto-translation** — Detects language, translates to English for model, translates response back
- 📍 **Location-aware** — Collects Tehsil & Union Council for regional outbreak tracking
- 🧠 **Conversation memory** — Remembers context within a session
- 📶 **Offline-first** — Works with poor rural connectivity, syncs when internet return

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
 
## 🧠 Tech Stack
 
| Layer | Technology | Purpose |
|---|---|---|
| Mobile App | React Native | Cross-platform Android/iOS app with RTL & Urdu support |
| Backend API | FastAPI (Python) | REST API connecting the mobile app to the AI model |
| LLM | Mistral 7B (QLoRA fine-tuned) | Core disease diagnosis model |
| Fine-Tuning | QLoRA (4-bit quantization) | Memory-efficient fine-tuning on livestock disease data |
| RAG / Vector DB | ChromaDB | Persistent vector search over the disease knowledge base |
| Translation | Meta NLLB-200 + Google Translate fallback | Urdu, Punjabi, Sindhi — offline-first, cloud fallback |
| Voice Input | Whisper (small) + Google STT fallback | Urdu speech-to-text for low-literacy users |
| Database | Firebase Firestore | Farmer profiles, diagnosis history, offline sync |
| Model Hosting | Modal.com | Serverless GPU — pay only per inference call |
 
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


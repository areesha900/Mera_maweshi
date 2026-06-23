
# 🐄 Mera Maweshi - میرا مویشی

> An AI-powered livestock disease diagnosis app for rural farmers in Pakistan.

Mera Maweshi lets a farmer describe their animal's symptoms in **Urdu language** and receive an AI-generated disease diagnosis - no vet visit required. Built for low-literacy users with large buttons, Urdu-first UI, and multilingual support.

---

## 📱 Screenshots

<img width="725" height="457" alt="Screenshot 2026-06-23 125337" src="https://github.com/user-attachments/assets/c630c54d-a001-4cb8-b7d4-faddd6f6c0e1" />
<img width="727" height="455" alt="Screenshot 2026-06-23 125347" src="https://github.com/user-attachments/assets/841c24ec-79a0-4a56-a12f-e883efe71ecb" />
<img width="720" height="456" alt="Screenshot 2026-06-23 125406" src="https://github.com/user-attachments/assets/14946d24-c6a1-4fcc-8c14-88f35f451bd9" />

---

## ✨ Features

- 🌐 **Multilingual** — English, Urdu
- 🤖 **AI Diagnosis** — Fine-tuned LLM trained on livestock disease data
- 💬 **Natural language input** — Farmer types or speaks symptoms in their language
- 🔄 **Auto-translation** — Detects language, translates to English for model, translates response back
- 📍 **Location-aware** — Collects Tehsil & Union Council for regional outbreak tracking
- 🧠 **Conversation memory** — Remembers context within a session
- 📶 **Offline-first** — Works with poor rural connectivity, syncs when internet return

---
 
## 🧠 Tech Stack
 
| Layer | Technology | Purpose |
|---|---|---|
| Mobile App | React Native | Cross-platform Android/iOS app with RTL & Urdu support |
| Backend API | FastAPI (Python) | REST API connecting the mobile app to the AI model |
| LLM | OpenChat 3.5 (QLoRA fine-tuned) | Core disease diagnosis model, consistent with prior research |
| Fine-Tuning | QLoRA (LoRA + 4-bit quantization) | Adapter-based fine-tuning on livestock disease data |
| RAG | ChromaDB | Persistent vector search over the disease knowledge base |
| Translation | Meta NLLB-200 + Google Translate fallback | Urdu, Punjabi, Sindhi — offline-first, cloud fallback |
| Voice Input | Whisper (small) + Google STT fallback | Urdu speech-to-text for low-literacy users |
| Database | Firebase Firestore | Farmer profiles, diagnosis history, offline sync |
 
---

## ⚙️ AI Pipeline

```
Farmer Input (text or voice)
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
Display Diagnosis on App
```

---

## 📊 Dataset

We use the Livestock Symptoms and Diseases dataset from Kaggle as our primary training and knowledge base source.

**Stats:**
- 43,778 entries
- 4 animals: cow, buffalo, sheep, goat
- 5 diseases: Pneumonia, Lumpy Virus, Blackleg, Foot and Mouth, Anthrax
- Each entry contains: `Animal`, `Age`, `Temperature`, `Symptom 1-3`, `Disease`

**Planned additions:**
- FAO EMPRES-i disease records for Pakistan-specific diseases
- Locally collected data in partnership with veterinary institutions (e.g. UVAS Lahore)

---

## 🛣️ Roadmap

- [x] AI model fine-tuning (QLoRA)
- [x] Language detection & translation pipeline
- [x] Urdu UI mockups
- [ ] FastAPI backend server
- [ ] React Native mobile app
- [ ] Full RAG pipeline (ChromaDB)
- [ ] Voice input (Whisper)
- [ ] Offline mode
- [ ] Farmer database & profile management (Firebase Firestore)

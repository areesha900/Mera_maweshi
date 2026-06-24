
# 🐄 Mera Maweshi - میرا مویشی

> An AI-powered livestock disease diagnosis app for rural farmers in Pakistan.

Mera Maweshi lets a farmer describe their animal's symptoms in **Urdu language** and receive an AI-generated disease diagnosis - no vet visit required. Built for low-literacy users with large buttons, Urdu-first UI, and multilingual support.

---

## 📱 Screenshots

### Initial

<img width="725" height="457" alt="Screenshot 2026-06-23 125337" src="https://github.com/user-attachments/assets/c630c54d-a001-4cb8-b7d4-faddd6f6c0e1" />
<img width="727" height="455" alt="Screenshot 2026-06-23 125347" src="https://github.com/user-attachments/assets/841c24ec-79a0-4a56-a12f-e883efe71ecb" />
<img width="720" height="456" alt="Screenshot 2026-06-23 125406" src="https://github.com/user-attachments/assets/14946d24-c6a1-4fcc-8c14-88f35f451bd9" />

###Updated

<img width="242" height="449" alt="image" src="https://github.com/user-attachments/assets/482073fa-7c6a-4c9a-a52c-93d1e626ed3d" />
<img width="241" height="461" alt="image" src="https://github.com/user-attachments/assets/47f9af1b-2133-4765-b46d-2365d1c60e8b" />
<img width="236" height="455" alt="image" src="https://github.com/user-attachments/assets/5fd1109c-849a-458e-a952-878b4401eb74" />
<img width="247" height="456" alt="image" src="https://github.com/user-attachments/assets/e30f055b-dd16-4a4c-b727-f58e290a43af" />
<img width="247" height="461" alt="image" src="https://github.com/user-attachments/assets/a4a03a38-8797-4425-85a6-63870bade541" />
<img width="244" height="456" alt="image" src="https://github.com/user-attachments/assets/73c1719a-c6d5-4922-8283-91bc63ff8e62" />
<img width="245" height="458" alt="image" src="https://github.com/user-attachments/assets/7cb12b8c-7060-4580-853d-09bdf736dde5" />

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

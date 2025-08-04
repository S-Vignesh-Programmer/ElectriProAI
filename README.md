# ⚡ ElectriProAI - Smart Electricity Utility Assistant

A **smart electricity assistant** platform to calculate electricity bills, analyze solar and EV usage, and interact with an AI assistant. Built using **Java Full Stack** technologies with a clean, responsive React frontend and a secure, Dockerized backend powered by Spring Boot.

---

##  Live Demo

🔗 **Frontend**: [https://electri-pro-ai.vercel.app](https://electri-pro-ai.vercel.app)

---

##  Key Features

-  **State-wise Electricity Bill Calculator**
-  **Solar Power Benefit Analyzer**
-  **EV Charging Cost Estimator**
-  **AI Chat Assistant** powered by **Gemini API**
-  **Backend Dockerized** for easy deployment
-  **REST API** with improved response structure

---

##  Tech Stack

###  Frontend (React)
- React.js
- Tailwind CSS
- React Icons
- Axios for API Requests

### Backend (Java)
- Spring Boot
- Spring MVC
- Spring Framework (Core/Context)
- Docker (Backend Containerization)

---

## 📁 Folder Structure

```bash
ElectriProAI/
├── backend/                # Spring Boot App
│   ├── src/main/java/
│   ├── controller/
│   ├── service/
│   ├── config/
│   └── Dockerfile
├── frontend/               # React App
│   ├── components/
│   ├── pages/
│   ├── assets/
│   └── tailwind.config.js
└── README.md

---

## Dockerized Backend Setup

cd backend
docker build -t electriproai-backend .
docker run -p 8080:8080 electriproai-backend

## Local Development

### Backend (Spring Boot)
cd backend
./mvnw clean install
java -jar target/electriproai.jar

### Frontend (React)
cd frontend
npm install
npm run dev

---

## 👨‍💻 Author
S. Vignesh
 Full Stack Java Developer 
 LinkedIn
 GitHub


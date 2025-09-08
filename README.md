# 🌽CROP CARE – A Crop Disease Detection App

[![License: MIT](https://img.shields.io/badge/License-MIT‑blue.svg)](#license)

## 🚜 Project Overview
A tool enabling farmers to **upload images of diseased crops** and receive immediate insights:
- 🌱 Machine Learning-based disease identification  
- 📄 Auto-generated report with:
  - Disease name
  - Description
  - Key Symptoms
  - Causes  
  - Recommended **organic** and **inorganic** treatments
  - Prevention methods
- 📊 Visual tracking of disease progression over time, using photos to estimate spread and trends  

This helps farmers understand and manage crop health effectively and sustainably.

## 🔧 Features
- Upload one or multiple images via a web or mobile interface  
- Disease classification using a trained ML model
- Provide personalized treatment solution to farmers by generating local weather specific reports
- Rich report generation per upload which can be downloaded in PDF format  
- Progress-tracking dashboard:
  - Graphs of disease severity over time  
  - Aggregated statistics & trend analysis  

## 🧰 Tech Stack
- **Backend**: NodeJS, Flask(Python), RestAPI
- **ML Model**: Efficientnet, Groq client with Meta llama3-70b-8192 model
- **Frontend**: React Native with Expo  
- **Database**: PostgreSQl  

## ⚙️ How to Run
- Install prerequisites:
  - Download and install the latest version of postgreSQL.
  - install the nodeJS framework as well as python.
- Clone the github repo.
- Run the database.sql file to create the database.
- Set up the env file.
- In a terminal, change to the backend directory and run, 
   ```bash
   npm i
   node server
   ```
- In a new terminal, change to backend/ML_Models directory, and run,
  ```bash
  python disease.py
  ```
- Similarly in another terminal, run,
  ```bash
  python diseaseSpread.py
  ```
- Finally, in a fourth new terminal, change to the front_end directory and run,
  ```bash
  npm i
  npx expo start
  ```
- Scan the QR code generated with the expo go app on your mobile phone, or plug in your phone to your PC and run it from there.

## Sample Output

[📽️Demo video 1](/demo1.mp4)
[📽️Demo video 2](/demo2.mp4)

  ## Creators

  - Kartik D. Shinde - https://github.com/HalianCage
  - Samiksha Surwase - https://github.com/samiksha0420
  - Srushti Ghogare - https://github.com/srushtighogare
  - Tanish Kulkarni - https://github.com/tanishkulkarni
  

# 🚀 Crypto Tracker App

A **Full-Stack Crypto Tracking Application** built with the **MERN stack** (MongoDB, Express, React, Node.js).  
It fetches live cryptocurrency data, stores historical snapshots, and provides a simple dashboard with charts, authentication, and protected routes.  

---

## ✨ Features
- 🔐 **Authentication**
  - Register, Login with JWT stored as **HTTP-only cookies**  
  - Secure Logout endpoint  
  - Protected frontend routes  
- 📊 **Crypto Dashboard**
  - View top cryptocurrencies with price, market cap, and 24h change  
  - **Pie chart** visualization for selected coin  
  - Search, filter, and sort coins  
  - Auto-refresh coin list every hour (frontend + backend cron job)  
- ⏱ **Backend Cron Job**
  - Hourly scheduled job using `node-cron`  
  - Syncs latest prices from CoinGecko API  
  - Stores both current snapshot and history in MongoDB  
- 🎨 **Frontend (React + TailwindCSS)**
  - Responsive design with Navbar, Login/Register pages  
  - Toast notifications for success/error  
  - Protected dashboard route (redirects to login if not authenticated)  

---

## 🛠 Tech Stack
- **Frontend:** React, React Router, TailwindCSS, Chart.js (`react-chartjs-2`), React Toastify  
- **Backend:** Node.js, Express.js, MongoDB (Mongoose), Node-Cron  
- **Auth:** JWT + HTTP-only cookies + bcrypt password hashing  

---
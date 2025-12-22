# 🔗 URL Shortener – Next.js & MongoDB

A modern URL shortener web application built using **Next.js App Router**, **MongoDB**, and **Clerk authentication**.  
The platform allows users to generate short URLs with click tracking, expiration control, and access-based limitations for guests, signed-in users, and premium users.

---

## 🚀 Features

- ✂️ Create short URLs from long links
- 🔁 Automatic redirection using short codes
- 📊 Click tracking and last accessed time
- ⏳ URL expiration support
- 👤 Tier-based access control:
  - Guest users (IP-based limits)
  - Signed-in users (extended validity)
  - Premium users (longest validity)
- 🔐 Authentication using **Clerk (Clerk ID instead of passwords)**
- 🛡️ Abuse prevention using IP rate limiting
- 📱 Responsive UI using **Tailwind CSS + shadcn/ui**
- ⚡ Built on **Next.js 16 App Router**

---

## 🧱 Tech Stack

| Layer | Technology |
|-----|-----------|
| Frontend | Next.js 16, React |
| Styling | Tailwind CSS, shadcn/ui |
| Backend | Next.js Server Components & API Routes |
| Database | MongoDB with Mongoose |
| Auth | Clerk |
| Utilities | NanoID / Crypto |
| Deployment Ready | Yes |

---

## 📁 Project Structure
app/
├── (auth)/ # Clerk auth routes
├── [shortCode]/ # Dynamic redirect route
│ └── page.jsx
├── api/
│ └── shorten/
│ └── route.js
├── dashboard/ # User dashboard
├── page.js # Landing page
└── layout.js

lib/
├── config/
│ └── db.js # MongoDB connection
├── models/
│ ├── Url.model.js
│ └── User.model.js
├── getClientIp.js
├── checkGuestLimit.js
└── getCurrentUser.js

components/
├── Header.jsx
├── Footer.jsx
└── UrlShortenerForm.jsx

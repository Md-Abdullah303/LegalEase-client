# ⚖️ LegalEase

LegalEase is a modern lawyer-hiring platform that connects clients with verified legal professionals. The app supports role-based dashboards for users, lawyers, and admins, along with hiring requests, payments, comments, and profile management.

## 📌 Project Name

LegalEase – Online Lawyer Hiring Platform

## 🎯 Purpose

This project helps clients discover lawyers, request consultations, make payments, and track hiring history. Lawyers can manage their profiles and services, while admins oversee users, lawyers, transactions, and analytics.

## ✨ Key Features

- User and lawyer authentication with Better Auth
- Role-based dashboards for client, lawyer, and admin
- Lawyer browsing, search, filtering, and details page
- Hiring request flow with Stripe payment support
- Comment system for hired clients
- Admin controls for users, lawyers, transactions, and analytics
- Responsive UI with dark/light mode support

## 🧰 Technologies Used

### Frontend

- Next.js
- React
- Tailwind CSS
- shadcn/ui
- Better Auth
- Stripe
- React Hot Toast
- Lucide React
- Next Themes

### Backend / Services

- Node.js
- Express.js
- MongoDB
- dotenv
- jose-cjs
- imgBB for image uploads

## 🚀 Live Link

Live Demo: Add your deployed URL here

## ⚙️ Environment Variables

Create a local environment file using the sample values below:

```env
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_key
NEXT_PUBLIC_URL=http://localhost:3000
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
MONGODB_URL=your_mongodb_connection_string
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

## ▶️ Run Locally

```bash
npm install
npm run dev
```

## 📂 Project Status

The core assignment features are implemented and the app is ready for deployment and final review.

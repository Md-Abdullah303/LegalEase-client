# ⚖️ LegalEase — Modern Legal Consultation Platform

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Better Auth](https://img.shields.io/badge/Better_Auth-Authentication-indigo?style=for-the-badge)](https://www.better-auth.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?style=for-the-badge&logo=stripe)](https://stripe.com/)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?style=for-the-badge&logo=vercel)](https://legal-ease-omega-five.vercel.app)

---

### 🌐 Live Platform
Experience the live application here:  
👉 **[Launch LegalEase Live Demo](https://legal-ease-omega-five.vercel.app)**

---

![LegalEase Preview](src/assests/lawyer-kana-img.avif)

## 📖 Overview

**LegalEase** is an on-demand legal consultation and lawyer-hiring web platform designed to bridge the gap between citizens requiring legal assistance and qualified, verified attorneys. 

Traditional legal hiring can be opaque, time-consuming, and difficult to navigate. LegalEase solves this by offering an intuitive marketplace where clients can browse certified lawyers across various disciplines, review transparent pricing and credentials, schedule consultations, and complete bookings through secure online payments.

---

## 🎯 Key Objectives

- **Accessibility**: Democratize access to quality legal advice across diverse practice areas.
- **Transparency**: Clear consultation pricing, verified lawyer profiles, and authentic client feedback.
- **Streamlined Workflow**: Frictionless booking flow from search to consultation with integrated Stripe checkout.
- **Role-Dedicated Portals**: Tailored interfaces for Clients, Legal Practitioners, and Administrators.

---

## 👥 Multi-Role Ecosystem

LegalEase implements a granular, role-based architecture designed around the needs of three distinct user types:

### 1. 👤 Client Portal
- **Lawyer Discovery & Search**: Filter attorneys by practice area (Criminal, Corporate, Family, Civil, Real Estate, Cyber Law, etc.), experience level, and consultation fees.
- **Comprehensive Lawyer Profiles**: Inspect verified bios, license details, years in practice, case specializations, and authentic client ratings.
- **Direct Consultation Booking**: Choose desired consultation packages and secure bookings via integrated Stripe checkout.
- **Client Dashboard**:
  - **Hiring History**: Real-time status tracking for all ongoing and completed consultations.
  - **Lawyer Quick View**: Conveniently review previously hired attorney details.
  - **Feedback & Reviews**: Post comments and ratings for hired practitioners to help other clients make informed decisions.
  - **Profile Management**: Maintain personal credentials and contact information.

### 2. ⚖️ Lawyer Workspace
- **Practitioner Dashboard**: Centralized hub displaying active client engagements and past case records.
- **Active Consultation Management**: Track incoming hiring requests, review client case briefs, and update case progress.
- **Practice Profile**: Customize professional bio, certifications, hourly/consultation rates, and contact details.
- **Client Feedback Feed**: View ratings and testimonial comments received from consulted clients.

### 3. 🛡️ Admin Command Center
- **Executive Overview**: Real-time metrics tracking total registered clients, active lawyers, bookings, and platform revenue.
- **User & Lawyer Moderation**: Search, view, update roles (promote to Lawyer/Admin or demote), and manage user accounts with confirmation dialogs.
- **Transaction Oversight**: Full ledger of Stripe transactions including customer identifiers, amounts, transaction IDs, and payment timestamps.
- **Analytics Suite**: Interactive data visualizations and charts showcasing category popularity, user growth trends, and transaction volume.

---

## ⚡ Core Capabilities & Architecture

### 🔐 Authentication & Authorization
- **Better Auth Integration**: High-security session management supporting Google OAuth single sign-on (SSO) and standard email/password authentication.
- **Role-Based Access Control (RBAC)**: Route middleware and layout guards ensuring strict separation between Client, Lawyer, and Admin dashboards, complete with custom unauthorized and forbidden fallback views.

### 💳 Integrated Stripe Payments
- **Secure Checkout**: Seamlessly handles consultation fee transactions with Stripe Elements and secure backend tokenization.
- **Instant Booking Confirmation**: Automatically updates booking state and generates verified transaction records upon payment completion.

### 📊 Real-Time Analytics & Data Visualization
- **Multi-Chart Analytics**: Leverages Chart.js and Recharts to generate visual breakdowns of consultation distributions, top legal categories, revenue metrics, and user acquisition metrics.

### 🎨 Modern UI & Adaptive Experience
- **Next Themes (Dark & Light Mode)**: Fully integrated theme switcher with persistent user preference.
- **Modern Component Library**: Crafted using shadcn/ui and Radix UI primitives for accessible, high-performance interactive elements.
- **Micro-Interactions**: Smooth animations powered by Framer Motion and tw-animate.
- **Zero-Flicker Skeleton Loading**: React Suspense and custom skeleton placeholders deliver instant perceived performance during asynchronous data fetching.

---

## 🔄 End-to-End User Journey

```
[ Discover Lawyers ] 
        │
        ▼
[ Compare Profiles & Expertise ] 
        │
        ▼
[ Request Consultation & Stripe Payment ] 
        │
        ▼
[ Lawyer Receives & Manages Active Case ] 
        │
        ▼
[ Consultation Completed ] 
        │
        ▼
[ Client Leaves Verified Rating & Review ]
```

---

## 🧰 Technology Stack

| Category | Technologies |
| :--- | :--- |
| **Frontend Framework** | [Next.js 16](https://nextjs.org/) (App Router, Server & Client Components) |
| **Core UI Library** | [React 19](https://react.dev/) |
| **Styling & Design System** | [Tailwind CSS v4](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/), [Radix UI](https://www.radix-ui.com/) |
| **Icons & Typography** | [Lucide React](https://lucide.dev/), [React Icons](https://react-icons.github.io/react-icons/) |
| **Theme & Animations** | [Next Themes](https://github.com/pacocoursey/next-themes), [Motion](https://motion.dev/), `tw-animate-css` |
| **Authentication** | [Better Auth](https://www.better-auth.com/) (Google OAuth + Email/Password) |
| **Payment Gateway** | [Stripe](https://stripe.com/) (`@stripe/stripe-js`, Stripe API) |
| **Data Visualization** | [Recharts](https://recharts.org/), [Chart.js](https://www.chartjs.org/) (`react-chartjs-2`) |
| **Notifications** | [React Hot Toast](https://react-hot-toast.com/) |
| **Backend & Database** | [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/), [MongoDB](https://www.mongodb.com/) |
| **Hosting & Deployment** | [Vercel](https://vercel.com/) |

---

## 📱 Core Application Pages

- **`/` (Home)**: Hero section, top legal disciplines, featured attorneys, and platform statistics.
- **`/lawyers` (Browse Lawyers)**: Dynamic directory with filtering, sorting, and search capabilities.
- **`/lawyers/[id]` (Lawyer Details)**: Deep-dive view of lawyer experience, fees, qualifications, and booking trigger.
- **`/auth/signin` & `/auth/signup`**: Clean authentication portal supporting credentials and Google OAuth.
- **`/dashboard/user`**: Client consultation history, feedback panel, and profile management.
- **`/dashboard/lawyer`**: Lawyer active case monitor, profile customization, and client testimonials.
- **`/dashboard/admin`**: Administrative control center for users, lawyers, financial ledger, and platform analytics.
- **`/forbidden` & `/unauthorized`**: Graceful route protection and permission error handling.

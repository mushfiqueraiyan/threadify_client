# Threadify

**Live Demo:** https://threadify-client.netlify.app/

---

## 🔗 Purpose

Threadify is a modern discussion forum built with the MERN stack (MongoDB, Express, React, Node.js) + Firebase auth. It lets users create threads, upvote/downvote, comment, share, and stay informed via role-based access and admin tools. Perfect for communities, study groups, hobby clubs, or any niche looking for a slick, interactive forum.

---

## ⭐ Key Features

### User (Member)

- **Create & View Posts**
  - Make new discussion threads
  - View all threads in a feed
- **Voting System**
  - Upvote or downvote posts
- **Commenting**
  - Add comments on any post
  - View all comments for a specific post
  - Report inappropriate comments
- **Social Sharing**
  - Share threads on Facebook, Twitter, LinkedIn, etc.
- **Authentication & Roles**
  - Sign up / log in with Firebase
  - Role-based access: User vs Admin
- **Personal Profiles**
  - Distinct profile pages for users and admins

### Admin

- **User Management**
  - Promote users to Admin or revoke Admin rights
- **Announcements**
  - Post global announcements to all users
- **Moderation**
  - View all reported comments
  - Delete offending comments or mark reports “no issues”
- **Tag Management**
  - Define and assign tags/categories for threads

---

## 🛠️ Tech Stack & NPM Packages

- **Front‑end:** React
- **Back‑end:** Node.js, Express
- **Database:** MongoDB
- **Auth:** Firebase Authentication
- **Payments (if extended):** Stripe

### Key NPM Packages

```json
{
  "@stripe/react-stripe-js": "^3.7.0",
  "@stripe/stripe-js": "^7.4.0",
  "@tanstack/react-query": "^5.81.2",
  "axios": "^1.10.0",
  "date-fns": "^4.1.0",
  "firebase": "^11.10.0",
  "lottie-react": "^2.4.1",
  "react": "^19.1.0",
  "react-dom": "^19.1.0",
  "react-hook-form": "^7.58.1",
  "react-hot-toast": "^2.5.2",
  "react-share": "^5.2.2",
  "recharts": "^3.1.0",
  "sweetalert2": "^11.22.1",
  "swiper": "^11.2.8"
}
```

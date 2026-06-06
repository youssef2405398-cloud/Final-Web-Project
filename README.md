# 🎓 Campus Event Hub

A full-stack web application for discovering, creating, and managing campus events. Built with Node.js, Express, MongoDB, and EJS.

![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.18-000000?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)
![EJS](https://img.shields.io/badge/Template-EJS-B4CA65?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Usage](#-usage)
- [API Routes](#-api-routes)
- [Screenshots](#-screenshots)
- [Roadmap](#-roadmap)
- [License](#-license)

---

## 🌟 Overview

Campus Event Hub centralises university life by giving students a single platform to browse upcoming events, RSVP with guests, and submit new events for admin approval. Admins get a dedicated dashboard to review, approve, or reject submissions, keeping the event feed relevant and high-quality.

---

## ✨ Features

### For Students
- 🔍 Browse and search approved campus events by title, location, or description
- 🏷️ Filter events by category (Academic, Sports, Cultural, Social, Workshop)
- 🎟️ RSVP to events and bring up to 5 guests
- ❌ Cancel RSVPs — seat is automatically released
- ✨ Submit new events for admin review

### For Admins
- 🛡️ Admin dashboard with platform-wide stats (users, events, pending count)
- ✅ Approve or reject pending event submissions
- 👥 View all registered users
- 📊 See recently approved events at a glance

### Platform
- 🌙 Dark / light theme toggle with `localStorage` persistence
- 📱 Fully responsive layout
- 🔔 Flash toast notifications for all user actions
- 🖼️ Image upload for events with fallback to a default image
- 🔐 Secure session-based authentication with MongoDB session store

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js 18+ |
| Framework | Express 4 |
| Database | MongoDB Atlas via Mongoose 7 |
| Templating | EJS |
| Authentication | express-session + connect-mongo |
| Password Hashing | bcryptjs (12 salt rounds) |
| File Uploads | Multer |
| Validation | express-validator |
| Logging | Morgan |
| Styling | Custom CSS with CSS variables (dark/light theme) |

---

## 📁 Project Structure

```
campus-event-hub/
├── config/
│   └── database.js          # MongoDB Atlas connection with resilience handling
├── controllers/
│   ├── authController.js    # Login, signup, logout logic
│   ├── eventController.js   # Home, event listing, creation, detail
│   ├── adminController.js   # Dashboard, approve/reject, user management
│   └── rsvpController.js    # RSVP form, submit, cancel
├── middleware/
│   ├── auth.js              # isAuthenticated, isAdmin, guestOnly guards
│   ├── errorHandler.js      # asyncHandler, validation errors, global error handler, 404
│   ├── logger.js            # Morgan request logger (dev/production aware)
│   ├── upload.js            # Multer config with MIME filter and 5MB limit
│   └── validation.js        # express-validator chains for all forms
├── models/
│   ├── User.js              # User schema with bcrypt pre-save hook
│   ├── Event.js             # Event schema with status workflow
│   └── RSVP.js              # RSVP schema with unique compound index
├── routes/
│   ├── authRoutes.js
│   ├── eventRoutes.js
│   ├── adminRoutes.js
│   ├── rsvpRoutes.js
│   └── staticPagesRoutes.js
├── views/
│   ├── partials/            # header, navbar, footer, toast, event-card
│   ├── index.ejs
│   ├── events.ejs
│   ├── event-detail.ejs
│   ├── create-event.ejs
│   ├── rsvp.ejs
│   ├── login.ejs
│   ├── signup.ejs
│   ├── admin.ejs
│   ├── admin-users.ejs
│   └── error.ejs
├── public/
│   ├── css/                 # Per-page stylesheets + main.css
│   ├── js/                  # Client-side scripts
│   └── images/              # Static images including default-event.jpg
├── app.js                   # Express app entry point
├── .env                     # Environment variables (not committed)
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (free tier works)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/campus-event-hub.git
   cd campus-event-hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Copy the example below into a new `.env` file in the project root:
   ```
   MONGODB_URI=your_mongodb_atlas_connection_string
   SESSION_SECRET=your_long_random_secret
   PORT=3000
   NODE_ENV=development
   ```
   See [Environment Variables](#-environment-variables) for details.

4. **Create the uploads directory**
   ```bash
   mkdir -p public/uploads/events
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   ```
   http://localhost:3000
   ```

### Creating an Admin Account

There is no admin self-registration UI by design. To create an admin:

1. Sign up with a normal account at `/signup`
2. Open your MongoDB Atlas collection and find the user document
3. Change `"role": "student"` to `"role": "admin"` and save

---

## 🔑 Environment Variables

| Variable | Description | Example |
|---|---|---|
| `MONGODB_URI` | Your MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/dbname` |
| `SESSION_SECRET` | Long random secret for session signing — generate with `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"` | `a3f9d2...` |
| `PORT` | Port the server listens on | `3000` |
| `NODE_ENV` | Environment — affects cookie security and logging | `development` or `production` |

> ⚠️ Never commit your `.env` file. It is listed in `.gitignore`.

---

## 📖 Usage

### Browsing Events
Navigate to `/events` to see all approved upcoming events. Use the search bar and category filter to narrow results. Pagination is included for large event lists.

### Creating an Event
Log in, click **Create Event** in the navbar, and fill out the form. Your event will be submitted with `pending` status and will appear publicly only after an admin approves it.

### RSVP
From any event detail page, click **RSVP Now** (you must be logged in). Choose your guest count (max 5) and confirm. You can cancel your RSVP at any time from the event page.

### Admin Dashboard
Admins see a **Dashboard** link in the navbar. From there you can approve or reject pending events and view all registered users at `/admin/users`.

---

## 🛣️ API Routes

### Auth
| Method | Route | Description | Access |
|---|---|---|---|
| GET | `/login` | Login page | Guest only |
| POST | `/login` | Submit login | Guest only |
| GET | `/signup` | Signup page | Guest only |
| POST | `/signup` | Submit signup | Guest only |
| GET | `/logout` | Destroy session | Authenticated |

### Events
| Method | Route | Description | Access |
|---|---|---|---|
| GET | `/` | Homepage with featured events | Public |
| GET | `/events` | All events with search & filter | Public |
| GET | `/events/:id` | Event detail page | Public |
| GET | `/create-event` | Event creation form | Authenticated |
| POST | `/create-event` | Submit new event | Authenticated |

### RSVP
| Method | Route | Description | Access |
|---|---|---|---|
| GET | `/rsvp/:id` | RSVP form for an event | Authenticated |
| POST | `/rsvp/:id` | Submit RSVP | Authenticated |
| POST | `/cancel-rsvp/:id` | Cancel RSVP | Authenticated |

### Admin
| Method | Route | Description | Access |
|---|---|---|---|
| GET | `/admin` | Admin dashboard | Admin only |
| GET | `/admin/users` | User list | Admin only |
| POST | `/admin/events/:id/approve` | Approve event | Admin only |
| POST | `/admin/events/:id/reject` | Reject event | Admin only |

### Static Pages
| Method | Route | Description |
|---|---|---|
| GET | `/about` | About page |
| GET | `/blog` | Blog page |
| GET | `/support` | Support & FAQ page |

---

## 🗺️ Roadmap

- [ ] Email notifications on event approval and RSVP confirmation
- [ ] User profile page with RSVP history
- [ ] Event editing and deletion by the original creator
- [ ] Organisers as a distinct user role (separate from student and admin)
- [ ] Calendar view for events
- [ ] QR code check-in for event attendance
- [ ] Admin analytics dashboard with charts
- [ ] Full test suite with Jest and Supertest

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome. Please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a pull request

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

<p align="center">Built with ❤️ for campus communities</p>"# campus-event-hub" 

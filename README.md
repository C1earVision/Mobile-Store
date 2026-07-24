# 📱 Phondizer — The Ultimate Mobile Store

Phondizer is a responsive, feature-rich, full-stack e-commerce web application designed for buying and selling new and used mobile phones. The application is built with a separate front-end static client and back-end RESTful API, providing a seamless user experience for customers, sellers, and administrators alike.

---

## 🚀 Live Demo

- **Front-End (Hosted on Vercel):** `https://phondizer.vercel.app` (or your custom Vercel domain)
- **Back-End API (Hosted on Render):** `https://mobilestoreapi-eo3f.onrender.com`

---

## ✨ Features

### 👤 Customer Features
- **User Authentication:** Secure signup and login system utilizing JWT tokens.
- **Product Catalog:** Browse a catalog of both **New** and **Used** mobile phones with modern carousel sliders (powered by Slick Slider).
- **Product Search & Filtering:** Dynamic, client-side filtering by brand/company, price (high-to-low / low-to-high), date added (newest/oldest), and name search.
- **Detailed Specifications:** View complete hardware specs for each phone (body dimensions, screen size, battery, camera features, memory, build, SIM support, etc.).
- **Interactive Reviews:** Write reviews, leave comments, and rate products with a fully interactive star-rating hover system.
- **Shopping Cart / Wishlist:** Add items to cart/wishlist directly from listings or details page.
- **User Profile Management:** Customize profile details and upload/change profile pictures.

### 🔑 Seller & Admin Features
- **Admin Inventory Control:** Add new phone listings with multiple images and specifications.
- **Manage Listings:** Modify, update details, or delete product listings directly from the user interface if authorized.

---

## 🛠️ Tech Stack

### Front-End
- **HTML5 & CSS3** (Vanilla styling, custom layout transitions)
- **JavaScript (ES6+)** (Dynamic DOM manipulation)
- **Axios** (CDN-loaded client to interact with the backend API)
- **Slick Slider / jQuery** (For clean, interactive carousels)
- **Particles.js & Typed.js** (For animations and interactive backgrounds)
- **ScrollReveal** (For entry scroll transitions)

### Back-End
- **Node.js & Express.js** (API framework)
- **Mongoose & MongoDB Atlas** (NoSQL database and ODM)
- **JWT (JSON Web Tokens)** (Secure user authentication)
- **Helmet, Cors, XSS-Clean, Express-Rate-Limit** (API security practices)

---

## 📂 Project Structure

```text
├── Back-End/               # Express API backend server
│   ├── controllers/        # Route controllers (auth, products, user wishlist/comments)
│   ├── db/                 # MongoDB database connection setup
│   ├── errors/             # Custom API error handlers
│   ├── middleware/         # Auth verification and error-handling middlewares
│   ├── models/             # Mongoose schemas (Users, Products, ProductsUsed)
│   ├── routes/             # Express routes definition
│   ├── app.js              # Server entry point
│   └── package.json        # Backend dependencies
│
└── Front-End/              # Client-side static website
    ├── CSS/                # Application stylesheets
    ├── HTML/               # Secondary pages (Login, Buy, AddProduct, Products, Profile)
    ├── JS/                 # Application scripts (casing corrected for case-sensitive hosting)
    ├── media/              # Images and graphical assets
    ├── index.html          # Main landing page
    └── vercel.json         # Vercel deployment configuration
```

---

## 💻 Local Installation & Setup

### Prerequisites
- Node.js (Version **v18.17.1** or higher is recommended)
- MongoDB Atlas account or a local MongoDB database

### Backend Setup
1. Open your terminal and navigate to the backend folder:
   ```bash
   cd Back-End
   ```
2. Install the server-side dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `Back-End` directory and set the following environment variables:
   ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   JWT_LIFETIME=30d
   ```
4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd ../Front-End
   ```
2. Install any front-end dev packages if necessary:
   ```bash
   npm install
   ```
3. By default, the frontend is configured to call the remote live API. To redirect requests to your local backend, update the axios URL paths in the `Front-End/JS/` folder from `https://mobilestoreapi-eo3f.onrender.com` to `http://localhost:3000`.
4. Open `index.html` in your browser (e.g. using the Live Server extension in VS Code) to view the application locally.

---
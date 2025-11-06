<div align="center">

# 🛍️ Vibe Commerce - Full Stack E-Commerce Application

[![Vibe Commerce](https://img.shields.io/badge/Vibe-Commerce-red?style=for-the-badge&logo=shoppingcart&logoColor=white)](https://github.com/yourusername/vibe-commerce)
[![React 18](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Node.js Express](https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=nodedotjs)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)

A modern, festive-themed full-stack e-commerce application built for the **Vibe Commerce internship assignment**.

---



---

</div>

## 🎥 Demo Video

[![Watch Demo Video](https://img.shields.io/badge/%F0%9F%93%BA-Watch_Demo_Video-red?style=for-the-badge&logo=youtube)](https://drive.google.com/file/d/12fdPTFPOZrWcvkGPiSWuD9_OqCmQo3I3/view?usp=sharing)

## ✨ Features

### 🎄 Frontend Magic

* **Festive Christmas Theme** with enchanting snow animations.
* **Fully Responsive Design** that works perfectly on all devices.
* **Product Catalog** with beautiful grid layout and hover effects.
* **Shopping Cart** with intuitive add/remove/update quantity controls.
* **Seamless Checkout process** with elegant receipt generation.
* **Modern React with TypeScript** for type-safe development.

### ⚡ Backend Excellence

* **RESTful API** with comprehensive error handling.
* **MongoDB Integration** for reliable data persistence.
* **Real-time Cart Management** with accurate total calculations.
* **Secure Checkout process** with order validation.
* **Scalable Architecture** ready for production deployment.

## 🛠️ Tech Stack

| Category | Frontend Technologies | Backend Technologies |
| :--- | :--- | :--- |
| **Primary** | ⚛️ React 18 with TypeScript | 🟢 Node.js with Express.js |
| **Data** | 📡 Axios for API communication | 🍃 MongoDB with Mongoose ODM |
| **Styling** | 🎨 CSS3 with custom animations & gradients | 🔒 CORS & Security middleware |
| **Routing/Architecture**| 🧭 React Router | 🎪 RESTful API architecture |
| **Utility** | 🎯 Modern React Hooks & Patterns | 🚀 Environment-based configuration |

## 🚀 Quick Start

### Prerequisites

* **Node.js** (v16 or higher)
* **MongoDB** (local installation or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
* `npm` or `yarn` package manager

### Installation

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/yourusername/vibe-commerce.git](https://github.com/yourusername/vibe-commerce.git)
    cd vibe-commerce
    ```
2.  **Setup Backend**
    ```bash
    cd backend
    npm install

    # Configure environment
    cp .env.example .env
    # Edit .env with your MongoDB connection string (e.g., MONGODB_URI=mongodb://localhost:27017/vibecommerce)

    # Start backend server
    npm run dev
    # Server runs on http://localhost:5000
    ```
3.  **Setup Frontend**
    ```bash
    cd frontend
    npm install

    # Start frontend development server
    npm start
    # Application runs on http://localhost:3000
    ```

## 📁 Project Structure

```text
vibe-commerce/
├── 📂 frontend/               # React TypeScript Application
│   ├── 📂 public/             # Static assets
│   ├── 📂 src/
│   │   ├── 📂 components/     # Reusable React components
│   │   │   ├── 🎄 ProductGrid.tsx
│   │   │   ├── 🛒 Cart.tsx
│   │   │   ├── 📝 ProductDetails.tsx
│   │   │   ├── 🧾 Receipt.tsx
│   │   │   └── ❄️ SnowFall.tsx
│   │   ├── 📂 types/          # TypeScript definitions
│   │   ├── 📂 api/            # API service layer
│   │   └── 🎭 App.tsx         # Main application component
│   └── package.json
├── 📂 backend/                # Node.js Express API
│   ├── 📂 models/             # MongoDB schemas
│   ├── 📂 routes/             # API route handlers
│   ├── 📂 data/               # Mock product data
│   ├── 🚀 server.js           # Express server setup
│   └── package.json
└── 📖 README.md               # Project documentation

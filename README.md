# 💰 Personal Finance Tracker

This is my internship project. It is a web app for track your money. User can make account, add income and expense, and see where the money is going with charts.

I made this with **MERN stack** (MongoDB, Express, React, Node.js).

🔗 **Live Demo:** https://your-app.vercel.app  _(change this to your Vercel link)_

---

## ✨ Features

- **Register and Login** – user can make account and login. Password is saved in hash form, not plain text.
- **JWT login** – after login, server give one token. With this token user can see only his own data.
- **Add transaction** – add income or expense with title, amount (₹), type and category.
- **Delete transaction** – if you add wrong entry, you can delete it.
- **Summary cards** – shows Total Balance, Total Income and Total Expenses. If expense is more than income, balance become red.
- **Charts** – pie chart for category wise expense, and bar chart for income vs expense.
- **Filters** – filter by type (income / expense) and by category. Cards and charts also change with filter.
- **Protected pages** – without login, you cannot open dashboard. It send you to login page.
- **Responsive** – works on mobile, tablet and laptop.

---

## 🧰 Tech Stack

| Part | What I used |
|------|-------------|
| Frontend | React (Vite), Tailwind CSS, React Router, Axios |
| Charts | Recharts |
| Icons | Lucide React |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas with Mongoose |
| Login / Security | JWT (jsonwebtoken), bcryptjs |
| Deployment | Vercel (frontend), Render (backend) |

---

## 📁 Folder Structure

```
personal finance tracker/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Charts, SummaryCards, TransactionForm, TransactionList
│   │   ├── context/        # AuthContext (login state)
│   │   ├── pages/          # Login, Register, Dashboard
│   │   ├── App.jsx         # routes
│   │   └── main.jsx
│   └── package.json
│
└── server/                 # Express backend
    ├── middleware/auth.js  # check JWT token
    ├── models/             # User.js, Transaction.js
    ├── routes/             # auth.js, transactions.js
    ├── server.js           # main server file
    └── package.json
```

---

## 🔌 API Endpoints

Base URL: `https://finance-tracker-backend-fe90.onrender.com`

| Method | Endpoint | What it do | Login needed? |
|--------|----------|------------|---------------|
| POST | `/api/auth/register` | Make new user | No |
| POST | `/api/auth/login` | Login user, get token | No |
| GET | `/api/transactions` | Get all transactions of the user | Yes |
| POST | `/api/transactions` | Add new transaction | Yes |
| DELETE | `/api/transactions/:id` | Delete one transaction | Yes |

For "Login needed" APIs, send the token in header like this:

```
Authorization: Bearer <your_token>
```

---

## ⚙️ How to run in your computer

### 1. Clone the project

```bash
git clone https://github.com/varmasandeep64/finance-tracker.git
cd finance-tracker
```

### 2. Setup backend

```bash
cd server
npm install
```

Make one `.env` file inside `server` folder:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=any_long_random_secret
```

Start the server:

```bash
npm run dev
```

Server will run on `http://localhost:5000`

### 3. Setup frontend

Open new terminal:

```bash
cd client
npm install
```

Make one `.env` file inside `client` folder:

```
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

Open `http://localhost:5173` in browser.

> ⚠️ Don't upload `.env` files to GitHub. They are already in `.gitignore`.

---

## 🚀 Deployment

**Backend (Render)**
1. Make new Web Service on Render and connect GitHub repo.
2. Root directory: `server`
3. Build command: `npm install`  |  Start command: `npm start`
4. Add environment variables: `MONGO_URI` and `JWT_SECRET`

**Frontend (Vercel)**
1. Import the GitHub repo on Vercel.
2. Root directory: `client` (framework: Vite)
3. Add environment variable `VITE_API_URL` = your Render backend URL (no `/` at the end).
4. Deploy.

---

## 🐞 Problem I faced and how I fixed

After deploy, register was not working. It show **"Registration failed"** and in console there was **404 error**.

- First I check the backend URL directly. Backend was working fine.
- So problem was in frontend. In Vercel I saved `VITE_API_URL` as **Secret** type.
- Vite need this value at build time, and it is public value anyway, so Secret type is not correct for it.
- I deleted it and made again as **Config** type, then redeploy. After that register started working. ✅

**What I learned:** check one layer at a time. First backend, then frontend, then the URL it is calling.

Also note: Render free plan sleeps when nobody use it. So first request can take 30 – 50 seconds. After that it is fast.

---

## 🔮 Future Plans

- Filter by date range
- Monthly trend chart
- Export data as CSV / PDF
- Recurring transactions (like rent every month)
- Dark mode

---

## 📸 Screenshots

_Add screenshots here: Login page, Dashboard, Charts._

---

## 👨‍💻 Author

**Sandeep Varma**
GitHub: [varmasandeep64](https://github.com/varmasandeep64)

Thank you for checking my project! 🙏

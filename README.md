# Personal Finance Tracker

This is my internship project. Its a web app to track your money. User can create account, add income and expences, and see where money is going with the help of charts.

I made it using MERN stack (MongoDB, Express, React, Node.js).

Live Demo: https://your-app.vercel.app (change this to vercel link)

## Features

- Register and login. Password is saved in hash form, not plain text.
- Login is done with JWT token. With this token user can see only his own data.
- Add transaction - title, amount, type (income or expense) and category.
- Delete transaction if you added wrong entry.
- Summary cards for Total Balance, Total Income and Total Expenses. If expense is more then income, balance shows in red colour.
- Pie chart for category wise expense and bar chart for income vs expense.
- Filter by type and by category. Cards and charts also change acording to filter.
- Without login you cannot open dashboard, it will send you to login page.
- Works on mobile and laptop both.

## Tech Stack

- Frontend - React (Vite), Tailwind CSS, React Router, Axios
- Charts - Recharts
- Icons - Lucide React
- Backend - Node.js, Express.js
- Database - MongoDB Atlas, Mongoose
- Auth - JWT, bcryptjs
- Deployment - Vercel for frontend, Render for backend

## Folder Structure

```
personal finance tracker/
  client/        -> react frontend
    src/
      components/   Charts, SummaryCards, TransactionForm, TransactionList
      context/      AuthContext
      pages/        Login, Register, Dashboard
      App.jsx
  server/        -> express backend
    middleware/auth.js
    models/        User.js, Transaction.js
    routes/        auth.js, transactions.js
    server.js
```

## API Endpoints

Base URL: https://finance-tracker-backend-fe90.onrender.com

- POST /api/auth/register - create new user
- POST /api/auth/login - login and get token
- GET /api/transactions - get all transactions of logged in user (token needed)
- POST /api/transactions - add new transaction (token needed)
- DELETE /api/transactions/:id - delete transaction (token needed)

For token needed api's, send token in header like this:

```
Authorization: Bearer <token>
```

## How to run in local

1. Clone the repo

```bash
git clone https://github.com/varmasandeep64/finance-tracker.git
cd finance-tracker
```

2. Backend setup

```bash
cd server
npm install
```

Create .env file in server folder:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=any_random_secret
```

Then run:

```bash
npm run dev
```

Server will start on http://localhost:5000

3. Frontend setup (open new terminal)

```bash
cd client
npm install
```

Create .env file in client folder:

```
VITE_API_URL=http://localhost:5000
```

Then run:

```bash
npm run dev
```

Open http://localhost:5173 in browser.

Note - dont push .env files on github.

## Deployment

Backend on Render:
- Create new web service and connect github repo
- Root directory - server
- Build command - npm install, Start command - npm start
- Add environment variables MONGO_URI and JWT_SECRET

Frontend on Vercel:
- Import the github repo
- Root directory - client
- Add environment variable VITE_API_URL with render backend url (without / in end)
- Deploy

## Problem I faced

After deployment register was not working, it was showing "Registration failed" and 404 error in console. First I checked backend url directly and backend was working fine. So the problem was in frontend side. In vercel I had saved VITE_API_URL as Secret type. Vite needs this value at build time and anyway its a public value, so I deleted it and added again as Config type and redeployed. After that register started working.

What I learned - check one thing at a time, first backend then frontend.

Also render free plan goes to sleep when nobody is using, so first request can take 30-50 seconds.

## Future Plans

- date range filter
- monthly trend chart
- export to csv/pdf
- recuring transactions like rent
- dark mode

## Screenshots

(add screenshots here)

## Author

Sandeep Varma
Github - https://github.com/varmasandeep64

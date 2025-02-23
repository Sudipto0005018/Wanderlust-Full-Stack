// const express = require('express');
// const app = express();

// const dotenv = require('dotenv');
// dotenv.config();

// require('./dbConnect');

// const cors = require('cors');
// app.use(cors({
//     origin: ['https://wanderlust-frontend-nine.vercel.app'],
//     methods: ["POST", "GET", "PUT", "DELETE"],
//     credentials: true
//   }));

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// const PORT = process.env.PORT || 7000;

// const userouter = require('./routers/userRouter');
// app.use('/user', userouter);

// const adminrouter = require('./routers/adminRouter');
// app.use('/admin', adminrouter);

// app.use('/', (req, res) => {
//     res.send('<h1>Hello, this is the backend</h1>');
// });

// app.listen(PORT, () => {
//     console.log(`server is running at ${PORT}`);
// })

const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

require("./dbConnect");

const cors = require("cors");
app.use(
  cors({
    origin: [
      "https://wanderlust-frontend-nine.vercel.app",
      "http://localhost:5173",
    ],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Handle preflight requests
app.options(
  "*",
  cors({
    origin: [
      "https://wanderlust-frontend-nine.vercel.app",
      "http://localhost:5173",
    ],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

const PORT = process.env.PORT || 7000;

const userouter = require("./routers/userRouter");
app.use("/user", userouter);

const adminrouter = require("./routers/adminRouter");
app.use("/admin", adminrouter);

app.use("/", (req, res) => {
  res.send("<h1>Hello, this is the backend</h1>");
});

app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});

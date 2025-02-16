const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

require('./dbConnect'); 

const cors = require('cors');
app.use(cors({
    origin: ['https://wanderlust-frontend-git-main-sudipto0005018s-projects.vercel.app/'],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
  }));

app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 7000;

const userouter = require('./routers/userRouter');
app.use('/user', userouter);

const adminrouter = require('./routers/adminRouter');
app.use('/admin', adminrouter);

app.use('/', (req, res) => {
    res.send('<h1>Hello, this is the backend</h1>');
});

app.listen(PORT, () => {
    console.log(`server is running at ${PORT}`);
})


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const router = require('./router/route');
const cookiParser = require('cookie-parser');
const app = express();

mongoose.connect(process.env.DB_URI)
.then(()=>{
    console.log("db connected");
})
.catch((err)=>{
    console.log(err);
})

app.get("/",(req,res)=>{
    res.json('started');
});

app.use(express.json());
app.use(cookiParser());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }));
  
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.header('Access-Control-Allow-Credentials', 'true');
//     next();
//   });
app.use(router);


app.listen(process.env.PORT,()=>{
    console.log("server started at 3006");
});

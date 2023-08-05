const express = require('express');
const cors = require('cors');
require('dotenv').config();
const Transaction =require('./models/Transaction.js');
const mongoose = require("mongoose");
const app = express();
const port = 4040;

app.use(cors());
app.use(express.json());
app.get('/api/test',(req , res)=> {
    res.json('test ok2');
});

app.post('/api/transaction', async (req, res) => {
    //console.log(process.env.MONGO_URL)
    await mongoose.connect(process.env.MONGO_URL);
    const {price,name,desc,datetime} =req.body;

    const transaction = await Transaction.create({price,name,desc,datetime});
    res.json(transaction);
});

app.get('/api/transactions',async (req,res)=>{
    await mongoose.connect(process.env.MONGO_URL);
    const transactions = await Transaction.find();
    res.json(transactions);
})

app.listen(port);
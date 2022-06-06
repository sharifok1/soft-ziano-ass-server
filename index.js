const express = require('express');
const { MongoClient } = require("mongodb");
const cors = require('cors');
const app = express();
require('dotenv').config();

const port = process.env.PORT || 5000
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://MultiForm:95W9Miamgz2D2ozx@cluster0.he93e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run(){
  try {
    await client.connect();
    const database = client.db('MultiForm');
    const ticketCollection = database.collection('TicketInfo');



   app.post('/ticketInfo', async(req,res)=>{
    const ticketInfo = req.body;
    const output = await ticketCollection.insertOne(ticketInfo);
  })

  app.get('/ticketInfo', async(req, res)=>{
    const ticketInfo = ticketCollection.find({});
    const output = await ticketInfo.toArray();
    res.json(output)

  })

    
  } finally {
    // await client.close();
  }
}

run().catch(console.dir);

app.get('/' , (req, res)=>{
  res.json('train ticket server running');
})

app.listen(port, ()=> {
  console.log('server running port is',port)
})



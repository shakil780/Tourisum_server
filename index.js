// import { MongoClient } from "mongodb"
const { MongoClient } = require('mongodb');
const express = require('express')
const app = express()
const port =process.env.PORT ||5000;

const ObjectId= require ('mongodb').ObjectId
const cors= require('cors')
require('dotenv').config()
app.use(cors())
app.use(express.json())




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.oetxi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function run(){
    try{
        await client.connect();
        const database = client.db("travel");
    const travelCollaction= database.collection('travel-user')
     const userCollaction= database.collection('user')
        // get api
        app.get('/travel-user',async (req,res)=>{
            const cursor= travelCollaction.find({})
            const travel= await cursor.toArray()
            res.send(travel)
        })  
        //  get single api
         app.get('/travel-user/:id', async(req,res)=>{
           const id = req.params.id
             const qurey = {_id: ObjectId(id)}
             const travel = await travelCollaction.findOne(qurey)
             res.json(travel) 
         })
          
    
      // post api
        app.post('/travel-user',async(req,res)=>{
            const tarvel=req.body
            console.log('hetting the post',tarvel);
            const result = await travelCollaction.insertOne(tarvel)
            console.log(result);
            res.json(result)
        })
        //  another post
        app.post('/user', async(req,res)=>{
          const user= req.body
           console.log("hetting the user",user);
           const result= await userCollaction.insertOne(user)
           console.log(result);
           res.json(result)
        })
          // another get api
          app.get('/user',async (req,res)=>{
            const cursor = userCollaction.find({})
            const user=  await cursor.toArray([])
            res.send(user)
          })
          //  delete api
           app.delete('/user/:id',async (req,res)=>{
            const id= req.params.id
            const qurey= {_id: ObjectId(id)}
            const result = await userCollaction.deleteOne(qurey);

            res.json(result)
             

           
           })
        


    }
    finally{

    }
} 
run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


app.use(cors())
app.use(express.json())
require('dotenv').config()




const uri = `mongodb+srv://${process.env.PHOTOGRAPHY}:${process.env.PASSWORD}@cluster0.mdunt9i.mongodb.net/?retryWrites=true&w=majority`;

console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const serviceCollection = client.db('photography').collection('services')
        const reviewCollection = client.db('reviewUser').collection('AllUser')
        app.get('/services', async(req,res)=>{
            const query = {}
            const cursor = serviceCollection.find(query)
            const service = await cursor.limit(3).toArray()
            res.send(service)
        })

        app.get('/services/:id', async(req,res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)}
            const service = await serviceCollection.findOne(query)
            res.send(service)
        })

           app.get('/allServices', async(req, res) => {
            const query = {}
            const cursor = serviceCollection.find(query)
            const service = await cursor.toArray()
            res.send(service)
        })

         app.post('/reviews', async(req, res) => {
            const order = req.body;
            const result = await reviewCollection.insertOne(order);
            res.send(result)
        })
        app.get('/reviews', async(req,res)=>{
            const query = {}
            const cursor = reviewCollection.find(query)
            const service = await cursor.toArray()
            res.send(service)
        })

        app.delete('/reviews/:id', async(req, res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await reviewCollection.deleteOne(query)
            res.send(result)
        })
    }
    finally{

    }
}
run().catch(error => console.error(error))
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
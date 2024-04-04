
import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = "mongodb+srv://nictekieli:Mudd2024!@clusteriso.s2vnr6k.mongodb.net/?retryWrites=true&w=majority&appName=clusterISO";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    const db = client.db('post_data')
    const coll = db.collection('current_posts')

    const query = { user : 'amy poo' }

    const test_post = await coll.findOne(query)
    console.log(test_post)

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

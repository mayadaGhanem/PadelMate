
require('dotenv').config()

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.DB_URL;
 
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
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    const db= await client.db('padel_mate');

  const res= await db.collection("users").find().toArray();
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
    console.log(res,'res');
  }catch(e) {
    // Ensures that the client will close when you finish/error
    console.log(e,'error')
  } finally {
    // Ensures that the client will clßose when you finish/error
    await client.close();
  }
}
run()
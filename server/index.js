const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();

app.use(cors());
app.use(express.json());

// Replace <username> and <password> with your actual MongoDB Atlas username and password
const username = 'saikrisharava28';
const password = '19112004Aa23';
const uri = `mongodb+srv://${username}:${password}@cluster0.6iw6f0d.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect().then(() => {
  console.log('Connected to MongoDB successfully'); // Log success message when connected

  const db = client.db('counselling1');
  const col = db.collection('register');

  app.post('/register', async (req, res) => {
    col.insertOne(req.body);
    console.log(req.body);
    res.send('Inserted successfully');
  });

  app.get('/retrieve', async (req, res) => {
    const result = await col.find().toArray();
    console.log(result);
    res.send(result);
  });

  app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name, role, email, password } = req.body;
    const result = await col.updateOne({ _id: new ObjectId(id) }, { $set: { name, role, email, password } });
    res.send('updated');
  });

  app.delete('/users/:id',async(req,res)=>{
    const{id}=req.params
    const result =await col.deleteOne({_id: new ObjectId(id)})
    res.json({message: 'deleted Successfully'})

  })

  app.get('/', (req, res) => {
    res.send('<h1>hello klu<h1>');
  });

  app.get('/about', (req, res) => {
    res.send('<h1>this is about page</h1>');
  });

  app.post('/contact', (req, res) => {
    res.send('<h1>this is about page</h1>');
  });

  app.listen(8080, () => {
    console.log('Express server is running');
  });
}).catch(err => {
  console.error('Error connecting to MongoDB:', err.message); // Log error message if connection fails
});

// import Users from './models/Users.js';
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const cors = require('cors')
const User = require('./models/Users.js')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/burger', {useNewUrlParser: true});

const db = mongoose.connection; 
db.on('error', console.error.bind(console, 'Erreur lors de la connexion')); 
db.once('open', () =>  console.log("Connexion à la base OK"));

app.use(express.json())
app.use(cors())




app.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = new User({
      name: req.body.name,
      password: hashedPassword
    })
    await user.save()
    res.status(201).send("Succes")
  } catch {
    res.status(500).send("Nope!")
  }
})

app.post('/connexion', async (req, res) => {
  const user = users.find(user => user.name === req.body.name)
  if (user == null) {
    return res.status(400).send('Cannot find user')
  }
  try {
    if(await bcrypt.compare(req.body.password, user.password)) {
      res.send('Success')
    } else {
      res.send('Not Allowed')
    }
  } catch {
    res.status(500).send()
  }
})

app.listen(3000)
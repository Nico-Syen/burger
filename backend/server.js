// import Users from './models/Users.js';
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const cors = require('cors')
const User = require('./models/User.js')
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
    const userRegister = new User({
      name: req.body.name,
      password: hashedPassword
    })
    await userRegister.save()
    res.status(201).send("Succes")
  } catch {
    res.status(500).send("Nope!")
  }
})

app.post('/connexion', (req, res) => {
  if (!req.body.name) {
    return res.status(400).send('Rentrez votre nom')
  }
  try {
    User.find({ name: req.body.name}, async (err, user) => {
      if (err){
        res.send(err); 
      }
      console.log(user)
     
      if (!user.length){
        res.send('nom pas trouvé');
      } else {

        if(await bcrypt.compare(req.body.password, user[0].password)) {
          res.send('Success')
        }
        else {
          res.send('Not Allowed')
        }
      }
    

      // res.json(user); 
  
  
  }).limit(1);

    
  } catch {
    res.status(500).send()
  }
})

app.listen(3001)
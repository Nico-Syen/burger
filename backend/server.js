require('dotenv').config()
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const cors = require('cors')
const User = require('./models/User.js')
const Product = require('./models/Product.js')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const authenticateToken = require('./middleware/authenticateToken.js').authenticateToken
mongoose.connect('mongodb://localhost:27017/burger', {useNewUrlParser: true});

const db = mongoose.connection; 
db.on('error', console.error.bind(console, 'Erreur lors de la connexion')); 
db.once('open', () =>  console.log("Connexion à la base OK"));

app.use(express.json())
app.use(cors())




app.post('/register', async (req, res) => {
  try {
     User.find({ name: req.body.name}, async (err, user) => {
      if (err){
        res.send(err); 
      }
      else if (user.length){
        res.send('Nom déjà utilisé');
      } else {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const userRegister = new User({
          name: req.body.name,
          password: hashedPassword
        })
        await userRegister.save()
        res.status(201).send("Success")
      }
    })

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
     
      if (!user.length){
        res.send('nom pas trouvé');
      } else {

        if(await bcrypt.compare(req.body.password, user[0].password)) {
          const user = { name : user.name , admin : user.admin }

          const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
          res.json({ accessToken : accessToken})
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

app.post('/addProduct', async (req, res) => {
    try {
    const productRegister = new Product({
      product: req.body.product,
      price: req.body.price
    })
      await productRegister.save()
      res.status(201).send("Success")
  
}
  catch {
    res.status(500).send("Nope!")
  }})

// MIDDLEWARE app.use('/', (req,res,next) =>)
  
app.get('/getProduct', async (req, res) => {
    try {
      Product.find({}, (err, burgers) => {
        console.log(burgers)
        res.send(burgers)
      })
  
    }
    catch {
      res.status(500).send("Nope!")
    }
  })

app.listen(3001)
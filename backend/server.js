const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const cors = require('cors')

app.use(express.json())
app.use(cors())

const users = []


app.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = { name: req.body.id, password: hashedPassword }
    users.push(user)
    res.status(201).send("Succes")
  } catch {
    res.status(500).send("Nope!")
  }
})

app.post('/connexion', async (req, res) => {
  const user = users.find(user => user.name === req.body.id)
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
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const Person = require('./models/person')
const errorHandler = require('./middlewares/errorHandler')

const MONGO_PASSWORD = process.env.MONGO_PASSWORD
const MONGO_URI = `mongodb+srv://haronmerzaie:${MONGO_PASSWORD}@cluster0.m5iqsgz.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const app = express()

app.use(cors())
app.use(express.json())

// Serve static files
app.use(express.static('dist'))

// Custom token for POST data
morgan.token('postdata', (req) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  }
  return null
})

// Using the 'tiny' format, but appending our 'postdata' at the end
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postdata'))

app.get('/api/persons', (req, res, next) => {
  Person.find({}).select('-__v')  // Exclude the __v field
    .then(persons => {
      res.json(persons)
    })
    .catch(next)
})

app.get('/info', (req, res, next) => {
  Person.countDocuments({})
    .then(count => {
      const date = new Date()
      res.send(`
        <p>Phonebook has info for ${count} people</p>
        <p>${date.toString()}</p>
      `)
    })
    .catch(next)
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id).select('-__v')  // Exclude the __v field
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).send({ error: 'Person not found' })
      }
    })
    .catch(next)
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(next)
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(req.params.id, person, { new: true, runValidators: true })
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'Name or number is missing' })
  }

  Person.findOne({ name: body.name })
    .then(existingPerson => {
      if (existingPerson) {
        existingPerson.number = body.number
        existingPerson.save()
          .then(updatedPerson => {
            res.json(updatedPerson)
          })
          .catch(error => next(error))
      } else {
        const person = new Person({
          name: body.name,
          number: body.number
        })
        person.save()
          .then(savedPerson => {
            res.json(savedPerson)
          })
          .catch(error => next(error))
      }
    })
    .catch(error => next(error))
})

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const router = require('./route')

app.use(cors())


const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/User'
const PORT = process.env.PORT || 9000
mongoose.connect(MONGODB_URI, { useNewUrlParser: true })

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose.connection.on('error', err => {
  console.error('MongoDB error', err)
})

express.static(path.join(__dirname, '/public'));


app.listen(PORT, () => {
  console.log(`Server running on port =  ${PORT}`)
})

router(app)
const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')
const adminroutes = require('./Routes/admin');
const questionroutes = require('./Routes/questions');
const usersroutes = require('./Routes/users')
const path = require('path');
const uri = "mongodb+srv://Nitheesh:Nitheesh@clusternitheesh-cbczs.mongodb.net/Nitheeshdb?retryWrites=true&w=majority";



app.use(cors()) // We're telling express to use CORS
app.use(express.json()) // we need to tell server to use json as well
app.use(adminroutes) // tells the server to use the routes in routes.js
app.use(questionroutes);
app.use(usersroutes);
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('database connected'));

if (process.env.NODE_ENV === 'production') {
    // Serve any static files  home/nitheesh/Desktop/giter/Integrated/TriviaAppIntegrated/triviafrontend/build
    app.use(express.static(path.join(__dirname, 'triviafrontend/build')));

    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, 'triviafrontend/build', 'index.html'));
    });
  }
app.listen(process.env.PORT, () => {
    console.log(process.env.REACT_APP_ENV)
    console.log("The API is running...")
})

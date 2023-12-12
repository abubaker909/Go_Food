const express = require('express');
const app = express();
const port = 5001;
const mongoDB = require('./db');
//const cors = require('cors'); // Import the cors middleware
app.use((req,res,next) => {
  res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin ,X-Requested-With, Content-Type, Accept"
  );
  next();
})

mongoDB();

//app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.use('/api', require('./Routes/CreateUser')); // Use the correct route
app.use('/api', require('./Routes/DisplayData')); 
app.use('/api', require('./Routes/OrderData')); 

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});




/*const express = require('express')
const app = express()
const port = 5001
const mongoDB = require("./db")

mongoDB();
app.get('/', (req,res) => {
    res.send('Hello World')
})

app.use(express.json())
app.use('/api/' , require("./Routes/CreateUser"))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})*/
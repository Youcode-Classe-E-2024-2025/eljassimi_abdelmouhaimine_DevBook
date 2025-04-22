const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connection = require('../config/db');

const app = express();
const PORT = 3000;

const authRoutes = require('./routes/authRoutes');

app.use(cors());
app.use(bodyParser.json());

app.use('/auth', authRoutes);

app.get('/', (req,res)=>{
    res.send('connected in app');
});

app.listen(PORT, () => {
    console.log('server running');
});
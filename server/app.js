const express = require('express');
const cors = require('cors');
const connection = require('../config/db');
const app = express();
const PORT = 3000;
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');

app.use(cors({
  origin: '*',
  credentials: true
}));

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/books', bookRoutes);

app.get('/', (req, res) => {
  res.send('connected in app');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
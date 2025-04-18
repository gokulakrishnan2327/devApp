const express = require('express');
const connectDB = require('./config/db');

const app = express();
const cors = require('cors');

app.use(cors({
  origin: 'https://rad-griffin-96cfa7.netlify.app' || 'http://localhost:3000',
  credentials: true
}));


//  Connect Database
connectDB();

//  Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

// listen to environment variable called port, default 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

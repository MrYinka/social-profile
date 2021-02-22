const express = require('express');
const app = express();
const dbConnect = require('./config/dbconnect');
const expressValidator = require('express-validator');


//DB Connection
dbConnect();

//Routes Imports
const usersRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const postRoutes = require('./routes/post');

//MiddleWares
app.use(express.json({extended: false}));
app.use(expressValidator());

//Routes Middleware
app.use('/api/users', usersRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/post', postRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> {
    console.log(`Node API listening on port: ${PORT}`);
});
const express = require('express');
const app = express();
const helmet = require('helmet');
const path = require('path');
const userRoutes = require('./routes/user');
const publicationRoutes = require('./routes/publication');
const commentRoutes = require('./routes/comment');
const likeRoutes = require('./routes/like');


// Permettre toutes demandes de toutes origines d'accéder à notre API
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
  });

app.use(express.json());
app.use(helmet());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', userRoutes);
app.use('/api/publication', publicationRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/publication', likeRoutes);

module.exports = app;
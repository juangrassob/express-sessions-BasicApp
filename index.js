const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');

const MongoStore = require('connect-mongo');

const app = express();

app.use(express.json());

app.use(session({
    secret: 'El secreto',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost/tutorial_db',
        collectionName: 'sessions'
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 1 dia
    }
}));

//Creo un middleware en el que agrego un componente extra a la session
app.use('/', (req, res, next) => {
    req.session.info = 'Aca puedo poner la informacion que quiera a travez de un middelware';
    next();
})


app.get('/', (req, res, next) => {
    res.send(req.session);
})

app.listen(3000);
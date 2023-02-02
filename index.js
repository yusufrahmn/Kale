const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config();

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const mongo = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
mongo.connect();
const db = mongo.db('Kale').collection('Messages')
module.exports.db = db;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Back End

const post = require('./methods/post');
const get = require('./methods/get');
const del = require('./methods/del');

app.post('/messages', post);
app.get('/messages/:id', get);
app.delete('/messages/:id', del);

// Front End

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/:id', (req, res) => {
    res.render('message');
});

app.listen(443, () => {
    console.log('✅ 🥬Kale is now live on port 443!');
});
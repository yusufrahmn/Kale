const { db } = require('./index');
const { ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');

// Authentication Function

const auth = async function(req, res) {
    let password = req.headers.authorization.split(' ').slice(1).join(' ');
    if (!password) return res.status(400).json({ error: "Please enter password." });
    if (!ObjectId.isValid(req.params.id)) return res.status(400).json({ error: "Invalid link." });

    let message = await db.findOne({ _id: new ObjectId(req.params.id) });
    if (!message) return res.status(400).json({ error: "Message not found." });

    let { hashedPassword, content } = message;
    if (!hashedPassword || !content) return res.status(400).json({ error: "Message not found." });

    let correctPassword = await bcrypt.compare(password, hashedPassword);
    if (!correctPassword) return res.status(400).json({ error: "Incorrect password." });

    return ['Authorized', content];
}


// POST request

const post = async function(req, res) {
    let { content } = req.body;
    let password = req.headers.authorization.split(' ').slice(1).join(' ');

    if (!content || !password) return res.status(400).json({ error: "Please enter both content and password." });

    let salt = await bcrypt.genSalt(14);
    let hashedPassword = await bcrypt.hash(password, salt);

    let newMessage = await db.insertOne({ content, hashedPassword });
    res.status(200).json({ _id: newMessage.insertedId });
}

// GET Request

const get = async function(req, res) {
    let msg = await auth(req, res);
    if (msg[0] != 'Authorized') return;
    res.status(200).json({ content: msg[1] });
}

// DELETE Request

const del = async function(req, res) {
    let msg = await auth(req, res);
    if (msg[0] != 'Authorized') return;
    await db.deleteOne({ _id: new ObjectId(req.params.id) });
    res.status(200).json({ message: 'Deleted!' });
}

module.exports = { post, get, del }
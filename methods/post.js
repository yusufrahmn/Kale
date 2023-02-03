const { db } = require('../index');
const { ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');

module.exports = async function(req, res) {
    let { content } = req.body;
    let password = req.headers.authorization.split(' ').slice(1).join(' ');

    if (!content || !password) return res.status(400).json({ error: "Please enter both content and password." });

    let salt = await bcrypt.genSalt(14);
    let hashedPassword = await bcrypt.hash(password, salt);

    let newMessage = await db.insertOne({ content, hashedPassword });
    res.status(200).json({ _id: newMessage.insertedId });
}
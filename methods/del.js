const { db } = require('../index');
const { ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');

module.exports = async function(req, res) {
    let password = req.headers.authorization.split(' ').slice(1).join(' ');
    if (!password) return res.status(400).json({ error: "Unauthorized" });

    let { hashedPassword, content } = await db.findOne({ _id: new ObjectId(req.params.id) });
    if (!hashedPassword || !content) return res.status(400).json({ error: "Message not found." });

    let correctPassword = await bcrypt.compare(password, hashedPassword);
    if (!correctPassword) return res.status(400).json({ error: "Unauthorized" });

    await db.deleteOne({ _id: new ObjectId(req.params.id) });
    res.status(200).send('Deleted!');
}
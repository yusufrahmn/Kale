const { db } = require('../index');
const { ObjectId } = require('mongodb');

module.exports = async function(req, res) {
    let messages = await db.findOne({ _id: new ObjectId(req.params.id) });
    res.send(messages);
}
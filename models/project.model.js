const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Project = new Schema({

    // TODO Add Validation

    title: {
        type: String
    },
    description: {
        type: String
    },
    repo: {
        type: String
    },
    technology: {
        type: String
    },
    image: {
        Data: Buffer,
        ContentType: String
    }
});

module.exports = mongoose.model('Project', Project);
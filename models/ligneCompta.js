const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema(
    {
        date: {
            type: Date,
            required: true
        },
        montant: {
            type: Number,
            required: true
        },
        client: {
            type: String,
            required: true
        },
        factureUrl: {
            type: String,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('LigneCompta', postSchema);
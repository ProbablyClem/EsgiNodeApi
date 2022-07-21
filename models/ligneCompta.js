import mongoose from 'mongoose';
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

export default mongoose.model('LigneCompta', postSchema);
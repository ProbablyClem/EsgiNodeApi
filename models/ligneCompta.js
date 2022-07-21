import mongoose from 'mongoose';
const Schema = mongoose.Schema;

/**
 * lineComptable type
 * @typedef {object} LigneComptable
 * @property {string} date.required - Date de la ligne
 * @property {string} client.required - Le nom du client 
 * @property {number} montant.required - Le montant - double
 * @property {string} factureUrl - Url de la facture associée 
 * @property {string} _id.required - Identifiant de la ligne
 * @property {string} createdAt.required - Date de création
 * @property {string} updatedAt.required - Date de modification
 */
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
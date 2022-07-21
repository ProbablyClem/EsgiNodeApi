//module nodes
import path from 'path';
//Import des librairies
import express from 'express'
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';

//Librairie pour l'upload de fichiers
import multer from 'multer';

import {router as ligneComptaRoutes } from './routes/ligneCompta.js';
import {router as authRoutes } from './routes/auth.js';


//avec les imports ecmascript, on est obligé de parse le dirname nous meme...
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

//Configuration multer
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'factures');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'text/plain' ||
        file.mimetype === 'application/octet-stream' ||
        file.mimetype === 'application/pdf'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

//On utilise le middleware pour parser le body de la requête et pouvoir y acceder via req.body
app.use(bodyParser.json()); 

//On rend les fichiers du dossier factures accessible
app.use('/factures', express.static(path.join(__dirname, 'factures')));

//On utilise le middleware multer pour parser les fichiers
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('facture'));
//Port d'écoute
const port = 3030

//On authorise les requêtes cross-origin    
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

//Pour les routes qui commencent par /compta on appelle le router de ligneCompta
app.use('/compta', ligneComptaRoutes);
app.use('/auth', authRoutes);

//Gestion des erreurs
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500; //Si l'erreur n'a pas de statusCode, on lui donne 500
    const message = error.message;
    res.status(status).json({ message: message });
});

//Connection a la base de données
mongoose
    .connect(
        'mongodb://localhost:27017/test'
    )
    .then(result => {  //On attend la connection a mongo avant de lancer notre serveur
        app.listen(port)     ;       
        console.log(`Server started on port ${port}`);
    })
    .catch(err => console.log(err));


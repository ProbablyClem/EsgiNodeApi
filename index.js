//module nodes
const path = require('path');
//Import des librairies
const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const ligneComptaRoutes = require('./routes/ligneCompta');

const app = express()

//On utilise le middleware pour parser le body de la requête et pouvoir y acceder via req.body
app.use(bodyParser.json()); 

//On rend les fichiers du dossier factures accessible
app.use('/factures', express.static(path.join(__dirname, 'factures')));
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


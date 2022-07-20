//Import des librairies
const express = require('express')
const bodyParser = require('body-parser');

const ligneComptaRoutes = require('./routes/ligneCompta');
const app = express()
//On utilise le middleware pour parser le body de la requête et pouvoir y acceder via req.body
app.use(bodyParser.json()); 

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

app.use('/compta', ligneComptaRoutes);

//Gestion des erreurs
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500; //Si l'erreur n'a pas de statusCode, on lui donne 500
    const message = error.message;
    res.status(status).json({ message: message });
});

app.listen(port)
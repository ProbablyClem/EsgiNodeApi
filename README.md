# EsgiNodeApi
Clément Guiton B3 ESGI AL
## Consignes
    - CRUD
    - Authentication
    - Connexion base de donnée
    - Upload de fichier
    - Validation
    - Utilisation des modules ecmascript
## Setup
 - Créer un fichier .env avec la variable DB_STRING qui contient l'url de la base de données
 - 
```console
$ npm install
$ node index.js
```

## Hierarchie


```
project
│   index.js //fichier principal    
│
└───routes //Contiens les endpoits avec la validation
│     |   ligneCompta.js ///logique metier
│     |   auth.js //authentication
│
└───controllers //contient la logique et les interactions avec la bdd
│     |   ligneCompta.js ///logique metier
│     |   auth.js //authentication
|
|
└───models //contiens les objets metiers
│     |   ligneCompta.js ///logique metier
│     |   auth.js //authentication
|
|
└───factures //contiens les factures envoyées par le client
│   
|
└───middleware //fonctions appelés avant les endpoits
      │   is-auth.js //permet de verifier que l'utilisateur est identifié
```

## Documentation Swagger
Pour acceder au swagger: 
    - Lancer le server ($ node index.js)
    - Acceder a l'url: http://localhost:3000/api-docs
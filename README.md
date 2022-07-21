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


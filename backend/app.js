const express = require('express'); // Framework express (une infrastructure d'applications Web Node.js)
const mongoose = require('mongoose'); // Mongoose qui facilite les interactions avec notre base de données MongoDB
const bodyParser = require('body-parser'); // Pour récuperer des données exploitable
const saucesRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');
const path = require('path');// Necessaire pour multer, importation de fichier comme les images
const mongoSanitize = require('express-mongo-sanitize'); // Nettoie les données fournies par l'utilisateur pour empêcher l'injection d'opérateur MongoDB.
const helmet = require("helmet");// Plugin de sécurité pour diverses attaques

const app = express(); // Permet de créer une application express

require('dotenv').config(); 
// Connextion mongoDB ,utilisation dotenv pour masquer mes identifiants, création du fichier .env pour stocker ces identifiants d'accés et placement dans .gitignore 
mongoose.set('useCreateIndex', true);        
mongoose.connect(process.env.MONGODB_CONNECT,  
  {  
    useNewUrlParser: true,             
    useUnifiedTopology: true 
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


//CORS - Cross Origin Resource Sharing  La sécurité CORS est une mesure de sécurité par défaut pour empêcher l'utilisation de ressources par des origines non-autorisées. (empêches les requetes malveillante.)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


app.use(bodyParser.json()); //Requêtes exploitables (Transformer le corps de la requête
//en objet javascript utilisable grâce à la méthode json() de bodyParser)

app.use(mongoSanitize()); // Pour empêcher l'injection de l'opérateur
app.use(helmet()); // Exécution du plugin de sécurité

app.use('/images', express.static(path.join(__dirname, 'images'))); //Gestion de la ressource image de façon statique

//Mes routes
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);

// Exportation de l'application
module.exports = app;
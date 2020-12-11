const express = require('express'); // Framework express
const mongoose = require('mongoose'); // Mongoose qui facilite les interactions avec notre base de données MongoDB
const bodyParser = require('body-parser'); // Pour récuperer des données exploitable
const saucesRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');
const path = require('path');// Necessaire pour multer, importation de fichier comme les images
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require("helmet");// Plugin de sécurité pour diverses attaques

const app = express(); // Permet de créer une application express

require('dotenv').config(); // Protection accés à la base de données
const user = process.env.DB_USER;
const pass = process.env.DB_PASS;
// Mongoose connect
mongoose.connect(`mongodb+srv://jackwonka:Hercules17@cluster0.vm1rm.mongodb.net/test?retryWrites=true&w=majority`,
    { useNewUrlParser: true,
     useUnifiedTopology: true 
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


//CORS - Cross Origin Resource Sharing  La sécurité CORS est une mesure de sécurité par défaut pour empêcher l'utilisation de ressources par des origines non-autorisées.
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


app.use(bodyParser.json()); //Requêtes exploitables (Transformer le corps de la requête
    // en objet javascript utilisable grâce à la méthode json() de bodyParser)

app.use(mongoSanitize()); // Pour empêcher l'injection de l'opérateur
app.use(helmet()); // Exécution du plugin de sécurité

app.use('/images', express.static(path.join(__dirname, 'images'))); //Gestion de la ressource image de façon statique

//Mes routes
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);

// Exportation de l'application
module.exports = app;
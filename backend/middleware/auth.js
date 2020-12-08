const jwt = require('jsonwebtoken');

// Récupère le token de la requête entrante
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    // On vérifie
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    // Récupère l'id du token
    const userId = decodedToken.userId;
    // Compare le userId de la requête à celui du token si non valable ou bien sinon on continue
    if (req.body.userId && req.body.userId !== userId) {
      throw 'User id non valable !';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};
const jwt = require('jsonwebtoken');

const tokenSecret = process.env.TOKEN_SECRET;

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token === null) return res.sendStatus(401);

  jwt.verify(token, tokenSecret, (err, userId) => {
    console.log(err);

    if (err) return res.sendStatus(403);

    req.user = userId;
    req.token = token;

    next();
  })
};

exports.generateAccessToken = (id) => {
  return jwt.sign({ id }, tokenSecret, { expiresIn: '1d' });
};

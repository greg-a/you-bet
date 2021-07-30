const jwt = require('jsonwebtoken');

// const tokenSecret = process.env.TOKEN_SECRET;
const tokenSecret = 'abc123'

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, tokenSecret, (err, user) => {
    console.log(err);

    if (err) return res.sendStatus(403);

    req.user = user;
    req.token = token;

    next();
  })
};

exports.generateAccessToken = (username) => {
  return jwt.sign({ username }, tokenSecret, { expiresIn: '1d' });
};

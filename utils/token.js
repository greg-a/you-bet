const jwt = require("jsonwebtoken");

const tokenSecret = process.env.TOKEN_SECRET;

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization-jwt"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token === null) return res.sendStatus(401);

  jwt.verify(token, tokenSecret, (err, userId) => {
    if (err) {
      console.log({ err });
      return res.sendStatus(412);
    }

    req.user = userId;
    req.token = token;

    next();
  });
};

exports.generateAccessToken = (payload, expiresIn = "1d") => {
  const token = jwt.sign(payload, tokenSecret, { expiresIn });
  return token;
};

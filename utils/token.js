const jwt = require("jsonwebtoken");
const { createHmac } = require("crypto");

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

exports.generateHashedPassword = (password) => {
  const hashedPassword = createHmac("sha256", tokenSecret)
    .update(password)
    .digest("hex");
  return hashedPassword;
};

exports.generateAccessToken = (payload) => {
  const token = jwt.sign(payload, tokenSecret);
  return token;
};

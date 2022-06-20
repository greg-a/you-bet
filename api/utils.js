exports.sendError = (error, response) => {
  if (error.name === "SequelizeUniqueConstraintError")
    return response.status(400).send(error.errors[0].message);
  return response.status(500).send("server error, try again shortly");
};

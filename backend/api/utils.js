exports.sendError = (
  error,
  response,
  defaultError = "Server error, try again shortly"
) => {
  try {
    if (error.name?.includes("Sequelize"))
      return response.status(400).send(error.errors[0].message);
    if (error.code && error.message)
      return response.status(error.code).send(error.message);
    if (typeof error === "string") return response.status(500).send(error);
    return response.status(500).send(defaultError);
  } catch (err) {
    return response.status(500).send(defaultError);
  }
};

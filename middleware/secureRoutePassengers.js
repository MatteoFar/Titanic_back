const jwt = require("jsonwebtoken");

module.exports = function secureRoutePassengers(req, res, next) {
  if (!req.headers.authorization)
    return res
      .status(403)
      .send({ error: "Access denied ! You must be authentified" });

  const [, token] = req.headers.authorization.split(" ");

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_API_TOKEN);
    req.token = token;
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(403).send({ error: "Access denied! Invalid Token ! " });
  }
};

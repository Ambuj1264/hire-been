const jwt = require("jsonwebtoken");

const verify = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, valid) => {
        if (err) {
          console.error(err.message);
          return res.status(403).send({ result: "Invalid or expired token" });
        } else {
          req.user = valid;
          next();
        }
      });
    } else {
      return res.status(401).send({ result: "Bearer token is missing" });
    }
  } else {
    return res.status(401).send({ result: "Authorization header is missing" });
  }
};

module.exports = verify;

const jwt = require("jsonwebtoken");
module.exports = {
  /**
   * Check if provided token is valid
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  checkToken: (req, res, next) => {
    let token = req.get("authorization");
    if (token) {
      // Remove Bearer from string
      token = token.slice(7);
      // Verify token
      jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
          res.sendStatus(401);
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      res.sendStatus(401);
    }
  }
};

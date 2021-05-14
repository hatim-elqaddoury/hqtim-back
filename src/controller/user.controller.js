const {
  hashSync,
  genSaltSync,
  compareSync
} = require("bcrypt");

const {
  sign
} = require("jsonwebtoken");

const UserService = require("../service/user.service");

let userS;

module.exports = class UserController {

  constructor() {
    userS = new UserService();
  }

  createUser(req, res) {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    this.userS.createUser(body, (err, results) => {
      if (err) {
        return res.status(500).json({
          message: err.code
        });
      }
      return res.status(200).json({
        message: "User created succussfully"
      });
    });
  }

  login(req, res) {
    const body = req.body;
    this.userS.getUserByUserEmail(body.email, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.status(403).json({
          message: "Invalid email or password"
        });
      }
      const result = compareSync(body.password, results.password);
      if (result) {
        results.password = undefined;
        const jsontoken = sign({
          result: results
        }, process.env.JWTthis.userS.KEY, {
          expiresIn: "1h"
        });
        return res.json({
          token: jsontoken
        });
      } else {
        return res.json({
          message: "Invalid email or password"
        });
      }
    });
  }

  getUserByUserId(req, res) {
    const id = req.params.id;
    userS.getUserByUserId(id, (err, results) => {
      if (err) {
        console.log(err);
        return res.send(500, err.code);
      }
      if (!results) {
        return res.sendStatus(404);
      }
      results.password = undefined;
      res.json(results);
    });
  }

  getUsers(req, res) {
    this.userS.getUsers((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json(results);
    });
  }

  updateUser(req, res) {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    this.userS.updateUser(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        message: "updated successfully"
      });
    });
  }

  deleteUser(req, res) {
    const data = req.body;
    this.userS.deleteUser(data, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          message: "Record Not Found"
        });
      }
      return res.json({
        message: "user deleted successfully"
      });
    });
  }

};
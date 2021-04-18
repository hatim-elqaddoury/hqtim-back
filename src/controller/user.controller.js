const {
  _createUser,
  _getUserByUserEmail,
  _getUserByUserId,
  _getUsers,
  _updateUser,
  _deleteUser
} = require("../service/user.service");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
  /**
   * 
   * @param {*} req 
   * @param {*} res 
   */
  createUser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    _createUser(body, (err, results) => {
      if (err) {
        return res.status(500).json({
          message: err.code
        });
      }
      return res.status(200).json({
        message: "User created succussfully"
      });
    });
  },
  /**
   * 
   * @param {*} req 
   * @param {*} res 
   */
  login: (req, res) => {
    const body = req.body;
    _getUserByUserEmail(body.email, (err, results) => {
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
        const jsontoken = sign({ result: results }, process.env.JWT_KEY, {
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
  },
  /**
   * 
   * @param {*} req 
   * @param {*} res 
   */
  getUserByUserId: (req, res) => {
    const id = req.params.id;
    _getUserByUserId(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          message: "Record not Found"
        });
      }
      results.password = undefined;
      return res.json(results);
    });
  },
  /**
   * 
   * @param {*} req 
   * @param {*} res 
   */
  getUsers: (req, res) => {
    _getUsers((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json(results);
    });
  },
  /**
   * 
   * @param {*} req 
   * @param {*} res 
   */
  updateUser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    _updateUser(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        message: "updated successfully"
      });
    });
  },
  /**
   * 
   * @param {*} req 
   * @param {*} res 
   */
  deleteUser: (req, res) => {
    const data = req.body;
    _deleteUser(data, (err, results) => {
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

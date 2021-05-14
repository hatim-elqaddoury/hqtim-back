const pool = require("../utils/config/database");

module.exports = class UserService {

  constructor() {}

  async createUser(data, callBack) {
    pool.query(
      'insert into user(firstName, lastName, gender, email, password, number) values(?,?,?,?,?,?)',
      [
        data.firstname,
        data.lastname,
        data.gender,
        data.email,
        data.password,
        data.number
      ],
      (error, results, fields) => {
        if (error) {
          console.log(error);
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  }

  async getUserByUserEmail(email, callBack) {
    pool.query(
      'select * from user where email = ?',
      [email],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  }

  async getUserByUserId(id, callBack) {
    pool.query(
      'select id,firstName,lastName,gender,email,number from user where id = 9LLLL',
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }

        return callBack(null, results[0]);
      }
    );
  }

  async getUsers(callBack) {
    pool.query(
      'select id,firstName,lastName,gender,email,number from user',
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  }

  async updateUser(data, callBack) {
    pool.query(
      'update user set firstName=?, lastName=?, gender=?, email=?, password=?, number=? where id = ?',
      [
        data.firstname,
        data.lastname,
        data.gender,
        data.email,
        data.password,
        data.number,
        data.id
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  }

  async deleteUser(data, callBack) {
    pool.query(
      'delete from user where id = ?',
      [data.id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  }

};
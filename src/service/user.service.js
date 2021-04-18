const pool = require("../utils/config/database");

module.exports = {
  _createUser: (data, callBack) => {
    pool.query(
      'insert into user(firstName, lastName, gender, email, password, number) values(?,?,?,?,?,?)',
      [
        data.first_name,
        data.last_name,
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
  },
  _getUserByUserEmail: (email, callBack) => {
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
  },
  _getUserByUserId: (id, callBack) => {
    pool.query(
      'select id,firstName,lastName,gender,email,number from user where id = ?',
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  _getUsers: callBack => {
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
  },
  _updateUser: (data, callBack) => {
    pool.query(
      'update user set firstName=?, lastName=?, gender=?, email=?, password=?, number=? where id = ?',
      [
        data.first_name,
        data.last_name,
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
  },
  _deleteUser: (data, callBack) => {
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

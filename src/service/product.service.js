const pool = require("../utils/config/database");

module.exports = {
  _createProduct: (data, callBack) => {
    pool.query(
      'insert into product(name, imgUrl, price) values(?,?,?)',
      [
        data.name,
        data.imgUrl,
        data.price||0
      ],
      (error, results, fields) => {
        if (error) {
          console.log(error.sqlMessage);
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  _getProductById: (id, callBack) => {
    pool.query(
      'select name, imgUrl, price from product where id = ?',
      [id],
      (error, results, fields) => {
        if (error) {
          console.log(error.sqlMessage);
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  _getProducts: callBack => {
    pool.query(
      'select name, imgUrl, price from product',
      [],
      (error, results, fields) => {
        if (error) {
          console.log(error.sqlMessage);
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  _getProductByCategory: (data, callBack) =>{

  },
  _updateProduct: (data, callBack) => {
    pool.query(
      'update product set name=?, imgUrl=?, price=? where id = ?',
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
          console.log(error.sqlMessage);
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  _deleteProduct: (data, callBack) => {
    pool.query(
      'delete from product where id = ?',
      [data.id],
      (error, results, fields) => {
        if (error) {
          console.log(error.sqlMessage);
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  }
};

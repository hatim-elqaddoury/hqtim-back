const pool = require("../utils/config/database");

module.exports = class ProductService {

  async createProduct(data, callBack) {
    pool.query(
      'insert into product(name, imgUrl, price) values(?,?,?)',
      [
        data.name,
        data.imgUrl,
        data.price || 0
      ],
      (error, results, fields) => {
        if (error) {
          console.log(error.sqlMessage);
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  }

  async getProductById(id, callBack) {
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
  }

  async getProducts(callBack) {
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
  }

  /**
   * 
   * @param {*} data - to fill
   * @param {*} callBack - to fill
   */
  async getProductByCategory(data, callBack) {

  }

  /**
   * 
   * @param {*} data - to fill
   * @param {*} callBack - to fill
   */
  async updateProduct(data, callBack) {
    pool.query(
      'update product set name=?, imgUrl=?, price=? where id = ?',
      [
        data.name,
        data.imgUrl,
        data.price,
      ],
      (error, results, fields) => {
        if (error) {
          console.log(error.sqlMessage);
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  }

  /**
   * 
   * @param {data} data 
   * @param {callBack} callBack 
   */
  async deleteProduct(data, callBack) {
    pool.query(
      'delete from product where id = ?',
      [data.id],
      (error, results) => {
        if (error) {
          console.log(error.sqlMessage);
          callBack(error);
        }

        var isDeleted = results.affectedRows > 0;
        return callBack(null, isDeleted);
      }
    );
  }

};
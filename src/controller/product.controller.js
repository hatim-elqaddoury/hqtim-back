const {
  _createProduct,
  _getProductById,
  _getProducts,
  _getProductByCategory,
  _updateProduct,
  _deleteProduct
} = require("../service/product.service");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { encrypt } = require("../utils/crypto/crypto.service");

module.exports = {
  /**
   * Create User
   * @param {} req 
   * @param {*} res 
   */
  createProduct: (req, res) => {
    const body = req.body;
    if(req.file) body.imgUrl =  req.protocol + '://' + req.get('host') + process.env.BASE_PATH+ "/file/" + req.file.filename;
    _createProduct(body, (err, results) => {
      if (err) {
        return res.status(500).json({
          message: err.code
        });
      }
      return res.status(201).json({
        message: body.name + " created succussfully"
      });
    });
  },

  /**
   * 
   * @param {*} req 
   * @param {*} res 
   */
  getProductById: (req, res) => {
    const id = req.params.id;
    _getProductById(id, (err, results) => {
      if (err) return res.status(500).json(err.code);
      else if (!results) return res.status(500).json(err);
      else return res.status(200).json(results);
    });
  },
  /**
   * 
   * @param {*} req 
   * @param {*} res 
   */
  getProducts: (req, res) => {
    _getProducts((err, results) => {
      if (err) return res.status(500).json(err.code);
      else if (!results) return res.status(500).json(err);
      else return res.status(200).json(results);
    });
  },
  /**
   * 
   * @param {*} req 
   * @param {*} res 
   */
  updateProduct: (req, res) => {
    const body = req.body;
    
    _updateProduct(body, (err, results) => {
      if (err)
        return res.status(500).json({
          message: err.code
        });
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
  deleteProduct: (req, res) => {
    const data = req.body;
    _deleteProduct(data, (err, results) => {
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
        message: "Product deleted successfully"
      });
    });
  }
};

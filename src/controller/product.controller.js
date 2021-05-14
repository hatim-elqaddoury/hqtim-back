const ProductService = require("../service/product.service");

let productS;

module.exports = class ProductController {

  constructor() {
    productS = new ProductService();
  }

  createProduct(req, res) {
    const data = req.body;
    console.log(data);
    if (req.file) data.imgUrl = req.protocol + '://' + req.get('host') + process.env.BASE_PATH + "/file/" + req.file.filename;
    productS.createProduct(data, (err, results) => {
      if (err) {
        return res.status(500).json({
          message: err.code
        });
      }
      return res.status(201).json({
        message: data.name + " created succussfully"
      });
    });
  }

  getProductById(req, res) {
    const id = req.params.id;
    productS.getProductById(id, (err, results) => {
      if (err) return res.status(500).json(err.code);
      else if (!results) return res.status(500).json(err);
      else return res.status(200).json(results);
    });
  }

  getProducts(req, res) {
    productS.getProducts((err, results) => {
      if (err) return res.status(500).json(err.code);
      else if (!results) return res.status(500).json(err);
      else return res.status(200).json(results);
    });
  }

  updateProduct(req, res) {
    const body = req.body;
    productS.updateProduct(body, (err, results) => {
      if (err)
        return res.status(500).json({
          message: err.code
        });
      return res.json({
        message: "updated successfully"
      });
    });
  }

  deleteProduct(req, res) {
    const data = req.body;
    console.log(data);
    productS.deleteProduct(data, (err, results) => {

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
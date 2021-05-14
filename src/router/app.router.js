const router = require("express").Router();

const FileController = require("../controller/file.controller");
const ProductController = require("../controller/product.controller");
const MailerController = require("../controller/mailer.controller");
const GSearchController = require("../controller/gsearch.controller");
const userController = require("../controller/user.controller");
const AuthService = require("../utils/auth/auth.service");

/**
 * Base URL PATH
 */
const basePath = process.env.BASE_PATH; //api


class Router {

  constructor() {

    this.user = new userController();
    this.auth = new AuthService();
    this.file = new FileController();
    this.mailer = new MailerController();
    this.gsearch = new GSearchController();
    this.product = new ProductController();

    this.initUser(this.auth, this.user);
    this.initProduct(this.file, this.product);
    this.initFile(this.file);
    this.initEmail(this.mailer);
    this.initGSearch(this.gsearch);
    this.initMiscellaneous();

  }

  initUser(auth, user) {
    router.get(basePath + "/users", auth.checkToken, user.getUsers);
    router.post(basePath + "/createUser", user.createUser);
    router.get(basePath + "/user/:id", user.getUserByUserId);
    router.post(basePath + "/login", user.login);
    router.patch(basePath + "/updateUser", auth.checkToken, user.updateUser);
    router.delete(basePath + "/deleteUser", auth.checkToken, user.deleteUser);
  }

  initProduct(file, product) {
    router.post(basePath + "/createProduct", file.uploadFile, product.createProduct);
    router.patch(basePath + "/updateProduct", file.uploadFile, product.updateProduct);
    router.delete(basePath + "/deleteProduct", product.deleteProduct);
    router.get(basePath + "/product/:id", product.getProductById);
    router.get(basePath + "/products", product.getProducts);
  }

  initFile(file) {
    router.get(basePath + "/assets/:filename", file.sendInternalFile); //from assets/images
    router.get(basePath + "/file/:filename", file.sendUploadedFile); // from ulpoads
    router.post(basePath + "/uploadFile", file.uploadFile); //fieldname : file
    router.post(basePath + "/uploadFiles", file.uploadFiles); //fieldname : files
    router.post(basePath + "/savefile", file.saveFile); // to ulpoad

  }

  initEmail(mailer) {
    router.post(basePath + "/sendEmail", mailer.sendEmailTo);
    router.post(basePath + "/getEmail", mailer.sendEmailFrom);
  }

  initGSearch(gsearch) {
    router.post(basePath + "/gsearch", gsearch.search);
  }

  initMiscellaneous() {

    // IF NOTHING FROM ABOVE, REFIRECT TO HOME
    router.all("/index", function (req, res) {
      // res.status(203, "hqtim").sendFile("./utils/miscellaneous/index.html" , { root : __dirname});
      res.status(203).send("<p>" + new Date().toLocaleString() + "</p>");
    });

    router.all("**", function (req, res) {
      res.redirect("/index");
      // if(!process.env.APP_REDIRECT) res.redirect("/index");
      // res.redirect(process.env.APP_REDIRECT);
    });

  }

}

new Router(); // instantiate Router
module.exports = router;
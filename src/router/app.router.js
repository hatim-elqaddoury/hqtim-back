const router = require("express").Router();
const { checkToken } = require("../utils/auth/token_validation");
const {
  createUser,
  login,
  getUserByUserId,
  getUsers,
  updateUser,
  deleteUser
} = require("../controller/user.controller");
const {
  createProduct,
  getProductById,
  getProducts,
  updateProduct,
  deleteProduct
} = require("../controller/product.controller");

const {
  uploadFile,
  uploadFiles,
  getFile,
  sendFile
} = require("../controller/file.controller");

const {
  sendEmailTo, sendEmailFrom
} = require("../controller/mailer.controller");

/**
 * Base URL PATH
 */
const basePath = process.env.BASE_PATH; //api

/**
 * USER
 */
router.get(basePath+"/users", checkToken, getUsers);
router.post(basePath+"/createUser", createUser);
router.get(basePath+"/user/:id", getUserByUserId);
router.post(basePath+"/login", login);
router.patch(basePath+"/updateUser", checkToken, updateUser);
router.delete(basePath+"/deleteUser", checkToken, deleteUser);

/**
 * PRODUCT
 */
router.post(basePath+"/createProduct", uploadFile, createProduct);
router.get(basePath+"/product/:id", getProductById);
router.get(basePath+"/products", getProducts);
router.get(basePath+"/updateProduct", getProducts);


/**
 * FILE
 */
router.get(basePath+"/assets/:filename", getFile); //from assets/images
router.get(basePath+"/file/:filename", sendFile); // from ulpoads
router.post(basePath+"/uploadFile", uploadFile); //fieldname : file



/**
 * EMAIL TEST
 */
 router.post(basePath + "/sendEmail", sendEmailTo);
 router.post(basePath + "/getEmail", sendEmailFrom);


/**
 * Index 
 */
router.all("/index", function(req, res) {
  // res.status(203, "hqtim").sendFile("./utils/miscellaneous/index.html" , { root : __dirname});
  res.status(203).send("<p>"+ new Date().toLocaleString() +"</p>");
});

/**
 * IF NOTHING FROM ABOVE, REFIRECT TO HOME
 */
router.all("**", function(req, res) {

  res.redirect("/index");
  // if(!process.env.APP_REDIRECT) res.redirect("/index");
  // res.redirect(process.env.APP_REDIRECT);
});


/**
 * EXPORT ROUTER
 */
module.exports = router;
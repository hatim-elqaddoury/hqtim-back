const multer = require("multer");
const path = require("path");

/**
 * Variables
 */
const uploadsFolder = "./uploads/"
const internalFolder = "./src/assets/images/"

/**
 * Storage engine
 */
const storage = multer.diskStorage({
    destination: uploadsFolder,
    filename: (req, file, cb) => {
        return cb(null, Date.now()+path.extname(file.originalname))
    }
});

/**
 * Filter
 */
const filter = function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg' && ext !== '.mp4') {
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true)
};

/**
 * uploadFile function
 */
const upload = multer({
    storage: storage,
    // fileFilter: filter,
    limits: {
        fileSize: 1024 * 1024 * 100
    },
    errorHandling: 'manual'
});


/**
 * upload a single file
 */
var uploadFile = function(req, res, next) {
  upload.single('file')(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      console.log("uploadFile : ", err.message);
      return next(err.message);
    } else if (err) {
      // An unknown error occurred when uploading.
      console.log("uploadFile : ", err.message);
      return next(err.message);
    }else if(!req.file){
      // fieldname is missing.
      console.log("uploadFile : ", "filedname is missing");
      next();
    }else{
      // Everything went fine.
      console.log("uploadFile : ", 1 +" file loaded");
      next();
    }
  })
};

/**
 * upload multiple files
 */
var uploadFiles = function(req, res, next) {
  upload.array('files')(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      console.log("uploadFiles : ", err.message);
      return next(err.message);
    } else if (err) {
      // An unknown error occurred when uploading.
      console.log("uploadFiles : ", err.message);
      return next(err.message);
    }else if(!req.files){
      // fieldname is missing.
      console.log("uploadFile : ", "filedname is missing");
      next();
    }else{
      // Everything went fine.
      console.log("uploadFile : ", req.files.length +" file(s) loaded");
      next();
    }
  })
};

/**
 * Get a file
 * @param {*} req 
 * @param {*} res 
 */
var getFile = function(req, res) {
  var filename = req.params.filename;
  res.status(200).sendFile(filename, { root : internalFolder}, function (err) {
    if (err) {
      console.log("getFile : ", err.path + " not found");
    }
    // else {
    //   console.log('getFile  :', filename + " sent");
    // }
  })
};

/**
 * Send a file
 * @param {*} req 
 * @param {*} res 
 */
var sendFile = function(req, res) {
  var filename = req.params.filename;
  res.status(200).sendFile(filename, { root : uploadsFolder}, function (err) {
    if (err) {
      console.log("sendFile : ", err.path + " not found");
    }
    // else {
    //   console.log('sendFile  :', filename + " sent");
    // }
  })
};



module.exports = {
  uploadFile, uploadFiles, getFile, sendFile
};


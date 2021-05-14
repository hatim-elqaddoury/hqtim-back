const FileService = require("../service/file.service");


/**
 * Middleware class (remember)
 */

let fileS;

module.exports = class FileController {

  constructor() {
    fileS = new FileService();
  }

  /**
   * upload a single file
   */
  uploadFile(req, res, next) {
    fileS.uploadFile(req, res, (err) => {
      if (err) {
        // An unknown error occurred when uploading.
        console.log("uploadFile : ", err);
        res.status(415)
        next(null, err.message);
      } else if (!req.file) {
        // fieldname is missing.
        console.log("uploadFile : ", "filed name is missing");
        res.status(415)
        next(null, "filed name is missing");
      } else {
        // Everything went fine.
        let msg = req.file.length + " file loaded";
        console.log("uploadFile : ", msg);
        next(null, msg);
      }
    });
  }

  /**
   * upload multiple files
   */
  uploadFiles(req, res, next) {

    fileS.uploadFiles(req, res, (err) => {
      if (err) {
        // An unknown error occurred when uploading.
        console.log("uploadFiles : ", err);
        res.status(415)
        next(null, err.message);
      } else if (!req.files) {
        // fieldname is missing.
        console.log("uploadFiles : ", "filedname is missing");
        res.status(415)
        next(null, "filed name is missing");
      } else {
        // Everything went fine.
        let msg = req.files.length + " file(s) loaded";
        console.log("uploadFiles : ", msg);
        next(null, msg);
      }
    });
  }

  /**
   * Send Internal file
   * @param {*} req 
   * @param {*} res 
   */
  sendInternalFile(req, res) {
    var filename = req.params.filename;
    res.status(200).sendFile(filename, {
      root: fileS.getInternalFolder()
    }, function (err) {
      if (err) {
        console.log("getFile : ", err.path + " not found");
        res.sendStatus(err.status);
      } else {
        console.log('Sent:', filename);
      }
    })
  }

  /**
   * Send Uploaded  file
   * @param {*} req 
   * @param {*} res 
   */
  sendUploadedFile(req, res) {
    const filename = req.params.filename;

    res.status(200).sendFile(filename, {
      root: fileS.getUploadsFolder()
    }, function (err) {
      if (err) {
        console.log("sendFile : ", err.path + " not found");
        res.sendStatus(err.status);
      } else {
        console.log('Sent:', filename);
      }
    })
  }

  /**
   * Download a file from url
   * @param {*} req 
   * @param {*} res 
   */
  saveFile(req, res) {
    fileS.downloadFile(req, res, async (err) => {
      if (err) {
        return res.status(415).send(err);
      } else {
        // console.log(req)
        res.status(201).send('finished downloading!');
      }
    });
  }

};
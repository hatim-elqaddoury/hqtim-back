const multer = require("multer");
const path = require("path");
const fs = require('fs');
const fetch = require('node-fetch');
const mime = require('mime-types')


/**
 * Variables
 */
const uploadsFolder = "./uploads/"
const internalFolder = "./src/assets/images/"
let upload;

module.exports = class FileService {

    constructor() {
        upload = this.setUpload();
    }

    setUpload() {

        /**
         * Storage engine
         */
        const storage = multer.diskStorage({
            destination: uploadsFolder,
            filename: (req, file, cb) => {
                return cb(null, Date.now() + path.extname(file.originalname).toLowerCase())
            }
        });

        /**
         * Filter
         */
        const filter = (req, file, callback) => {
            var ext = path.extname(file.originalname);
            if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg' && ext !== '.mp4') {
                return callback(new Error('Only images are allowed'))
            }
            callback(null, true)
        };

        /**
         * uploadFile function
         */
        return multer({
            storage: storage,
            // fileFilter: filter,
            limits: {
                fileSize: 1024 * 1024 * 100
            },
            errorHandling: 'manual'
        });
    }

    getInternalFolder() {
        return internalFolder;
    }

    getUploadsFolder() {
        return uploadsFolder;
    }

    /**
     * upload a single file
     */
    async uploadFile(req, res, err) {
        upload.single('file')(req, res, err);
    }

    /**
     * upload multiple files
     */
    async uploadFiles(req, res, err) {
        upload.array('files')(req, res, err)
    }

    /**
     * save to uploads
     */
    async downloadFile(req, res, next) {

        upload.array()(req, res, async () => {

            const fileUri = req.body.file;
            if (fileUri) {
                
                const response = await fetch(fileUri);

                const buffer = await response.buffer();

                const fileType = mime.extension(response.headers.get('content-type'));
                
                // path.basename(response.headers.get('content-type'));

                // if (fileType.includes('html')) {
                //     let msg = fileType + ' is not supported';
                //     console.error(msg);
                //     return next(msg);
                // }

                const fileSize = response.headers.get('content-length');

                const fileName = path.join(uploadsFolder, Date.now() + "_" + fileSize + "." + fileType);

                fs.writeFile(fileName, buffer, next);

            } else {
                let msg = "filedname is undefined";
                console.error(msg);
                return next("filedname is undefined");
            }
        });


    }

};
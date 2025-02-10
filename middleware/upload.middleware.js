const multer = require("multer");
const fs = require("fs");
const path = require("path");



      const storage = multer.diskStorage({

        destination: (req, file, cb) => {
            if (file.mimetype.startsWith('image')) {
                cb(null, 'uploads/images/');
            } else if (file.mimetype.startsWith('video')) {
                cb(null, 'uploads/videos/');
            }
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + path.extname(file.originalname));
        }
    });
    const upload = multer({ storage });
   




module.exports = upload; // **upload** obyektini export qilamiz

const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Har bir yuklangan faylni yangi papkaga joylashtirish
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Yangi papka nomini yaratish

        
    const folderName = `uploads/${req.body.name}`;
    
    // Yangi papkani yaratish, agar mavjud bo'lmasa
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName);
    }
    
    // Fayllarni shu papkaga saqlash
    cb(null, folderName);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

module.exports = upload; // **upload** obyektini export qilamiz

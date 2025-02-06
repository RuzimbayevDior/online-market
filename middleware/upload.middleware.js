const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Har bir yuklangan faylni yangi papkaga joylashtirish
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Yangi papka nomini yaratish

    const a = req.body.name
    const b = a.replace(/\s+/g, '')


    const folderName = `uploads/${b}`;
    
    // Yangi papkani yaratish, agar mavjud bo'lmasa
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName);
    }
    
    // Fayllarni shu papkaga saqlash
    cb(null, folderName);
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}${path.extname(file.originalname)}`);
    }
});
const upload = multer({ storage: storage });






// app.get('//', (req, res) => {
//     const filenames = req.params.filenames.split(','); // URL-dan fayl nomlarini olish
//     let index = 0;
  
//     // Fayllarni ketma-ket yuborish
//     const sendNextFile = () => {
//       if (index < filenames.length) {
//         const filename = filenames[index];
//        
//         res.sendFile(filePath, (err) => {
//           if (err) {
//             console.error(err);
//           } else {
//             index++;
//             sendNextFile(); // Keyingi faylni yuborish
//           }
//         });
//       }
//     };
  
//     sendNextFile(); // Fayllarni yuborishni boshlash
//   });






module.exports = upload; // **upload** obyektini export qilamiz

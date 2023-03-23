// const multer = require('multer');
import multer from "multer";
import fs from 'fs';
// const fs = require('fs');


function destinationPath(req, file, callback) {
  var stat = null;
  try {
    stat = fs.statSync(process.env.FILE_UPLOAD_PATH);
  } catch (err) {
    fs.mkdirSync(process.env.FILE_UPLOAD_PATH);
  }
   callback(null, process.env.FILE_UPLOAD_PATH);
}

function fileNameConvention(req, file, callback) {
  callback(null, file.originalname);
}

const storage = multer.diskStorage({
  destination: destinationPath,
  filename: fileNameConvention
});

const fileUploadConfig = {
  storage: storage,
};

export default fileUploadConfig;
// module.exports.fileUploadConfig = fileUploadConfig;

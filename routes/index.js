const express = require('express');
var util = require('util');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const formidable = require('formidable');
const {logger} = require("../app");

const formOptions = {
    uploadDir: path.join(__dirname, "..", "uploads"),
    encoding: 'utf-8',
    keepExtensions: true,
    maxFileSize: 15 * 1024 * 1024,
    multiples: true,
  };
  
  fs.existsSync(path.join(__dirname, "..", "uploads")) || fs.mkdirSync(path.join(__dirname, "..", "uploads"))
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
const allowedFiles = ["application/pdf", "image/png", "image/jpeg", "image/pjpeg", "image/bmp", "image/x-windows-bmp"];
router.post('/fileUpload', (req, res) => {
  const form = new formidable.IncomingForm(formOptions);
  let allFiles;
  form.on('fileBegin', function (name, file) {
    if (!allowedFiles.includes(file.type)) {
      file.path = form.uploadDir + file.name + "-" + Date.now();
      throw Error("Incorrect File Type");
    }
  });
  form.on('file', function (name, file) {
    if(allFiles == undefined) allFiles = [];
    allFiles.push(file)

    console.log('Uploaded ' + file.name + "\tTo: " + file.path.split('\\'));

  });
  form.on('error', err => {
    res.send("Incorrect File Format");
    console.log('\n' + err + '\n');
  });
  // console.log(allFiles);
  form.parse(req, (err, field, files) => {
    // if(err) console.log(util.inspect(err))
    console.warn("console warn 28:\t" + util.inspect(files));
  });
  form.on('end', () => {
      console.warn("console warn 53:\t" + util.inspect(allFiles));
  });


});

module.exports = router;

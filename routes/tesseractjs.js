 "use strict";
const path = require('path');
const fs = require('fs');
const Tesseract = require('tesseract.js');
const util = require("util");
// Tesseract.workerOptions.langPath = path.join(__dirname, "trainedData");
const recognize = async () => {
  console.log(path.join(__dirname, "trainedData"));
    const worker1 = Tesseract.createWorker({
      langPath: "./trainedData",

        logger: m => console.log(m)
      });
    await worker1.load();
    await worker1.loadLanguage("eng+hin+tel+urd");
    await worker1.initialize("eng+hin+tel+urd");
    await worker1.setParameters({tessedit_ocr_engine_mode: "OEM_TESSERACT_LSTM_COMBINED",  preserve_interword_spaces: "1", tessedit_pageseg_mode: "PSM_OSD_ONLY", tessjs_create_osd: "1"}); //tessedit_pageseg_mode: "PSM_OSD_ONLY", tessjs_create_osd: "1"
    // const {data} = await worker1.recognize(path.join(__dirname, "FInance-White Paper-telugu.pdf"));
    // try{
    // await fs.appendFile(path.join(__dirname,'ocrtext.txt', data));
    // console.log("tesseract OCR'ed please read the file");
    // } catch (err) {
    //     console.log("error from tesseractjs line 15: \t" + err);
    // }

    const {data} = await worker1.recognize(path.join(__dirname, "FROM", "FInance-White Paper-telugu-2.jpg"));
    fs.writeFileSync(path.join(__dirname, "FROM", `file.txt`), util.inspect(data.text));
    await worker1.terminate();
    
    // await fs.readdir(path.join(__dirname, "FROM"), (err, files) => {
    //     let count = 0;
    //     console.log();
    //     files.forEach(async file => {
    //      try {
    //          const {data} = await worker1.recognize(path.join(__dirname, "FROM")+"\\"+file);
    //          count++;
    //          fs.writeFileSync(path.join(__dirname, "FROM", `file${count}.txt`), util.inspect(data));
    //      } catch (error) {
    //          console.log("Error in tesseractjs line27:\t" + error);
    //      } 
    //     });
    //   });


//     worker1.recognize(
//     path.join(__dirname, "FInance-White Paper-telugu.pdf"),
//     "eng+hin+tel+urd",
//     {logger: m => console.log(m)}
//     ).then(({data: {text}}) => {
//     fs.appendFile('./ocrtext.txt', text, (err) => {
//         if(err) {console.log('from tesseractjs line 11:\t' + err);}
//         console.log("tesseract OCR'ed please read the file");
//     });
// });
};
module.exports = recognize;
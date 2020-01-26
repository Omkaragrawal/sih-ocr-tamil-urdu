"use strict";
const path = require("path");
const fs = require("fs");
const axios = require("axios");
const gunzip = require('gunzip-file');



const downloadFile = async (link, file) => {
  const response = await axios({
    method: "GET",
    url: link,
    responseType: 'stream'
  });

  response.data.pipe(fs.createWriteStream(file));
  return new Promise((resolve, reject) => {
    response.data.on("end", () => {
      resolve();
    });

    response.data.on("error", (error) => {
      reject(error);
    });
  });
};

const checkTrainData = async () => {
  console.time("Total time taken to setup project is: ");
  fs.existsSync(path.join(__dirname, "routes", "trainedData")) || fs.mkdirSync(path.join(__dirname, "routes", "trainedData"));

  try {

    if (!fs.existsSync(path.join(__dirname, "routes", "trainedData", "eng.traineddata.gz"))) {
      console.time("total time taken for english file to download is: ");
      //   const trainFile = ;
      try {
        await downloadFile("https://github.com/naptha/tessdata/blob/gh-pages/4.0.0/eng.traineddata.gz?raw=true", path.join(__dirname, "routes", "trainedData", "eng.traineddata.gz"));
        // console.log("Extracting eng.trainedData file");
        // gunzip(path.join(__dirname, "routes", "trainedData", "eng.traineddata.gz"), path.join(__dirname, "routes", "trainedData", "eng.traineddata"), () => {
        //   console.log('Extraction of eng.traineddata done!');
        // });
        // console.log("File download completed for english trained data");
        // console.log("Deleting the eng.traineddata.gz file");
        // fs.unlinkSync(path.join(__dirname, "routes", "trainedData", "eng.traineddata.gz"));
      } catch (error) {
        console.log(error);
      }
      console.timeEnd("total time taken for english file to download is: ");
    }

    if (!fs.existsSync(path.join(__dirname, "routes", "trainedData", "hin.traineddata.gz"))) {
      console.time("total time taken for hindi file to download is: ");
      //   const trainFile = ;
      console.log("File download started for file hindi trained data");
      try {
        await downloadFile("https://github.com/naptha/tessdata/blob/gh-pages/4.0.0/hin.traineddata.gz?raw=true", path.join(__dirname, "routes", "trainedData", "hin.traineddata.gz"));
        // console.log("Extracting hin.trainedData file");
        // gunzip(path.join(__dirname, "routes", "trainedData", "hin.traineddata.gz"), path.join(__dirname, "routes", "trainedData", "hin.traineddata"), () => {
        //   console.log('Extraction of hin.traineddata done!');
        // });
        // console.log("File download completed for hindi trained data");
        // console.log("Deleting the eng.traineddata.gz file");
        // fs.unlinkSync(path.join(__dirname, "routes", "trainedData", "hin.traineddata.gz"));
      } catch (error) {
        console.log(error);
      }
      console.timeEnd("total time taken for hindi file to download is: ");
    }

    if (!fs.existsSync(path.join(__dirname, "routes", "trainedData", "tel.traineddata.gz"))) {
      console.time("total time taken for telugu file to download is: ");
      //   const trainFile = ;
      console.log("File download started for file telugu trained data");
      try {
        await downloadFile("https://github.com/naptha/tessdata/blob/gh-pages/4.0.0/tel.traineddata.gz?raw=true", path.join(__dirname, "routes", "trainedData", "tel.traineddata.gz"));
        // console.log("Extracting tel.trainedData file");
        // gunzip(path.join(__dirname, "routes", "trainedData", "tel.traineddata.gz"), path.join(__dirname, "routes", "trainedData", "tel.traineddata"), () => {
        //   console.log('Extraction of tel.traineddata done!');
        // });
        // console.log("File download completed for telugu trained data");
        // console.log("Deleting the eng.traineddata.gz file");
        // fs.unlinkSync(path.join(__dirname, "routes", "trainedData", "tel.traineddata.gz"));
      } catch (error) {
        console.log(error);
      }
      console.timeEnd("total time taken for telugu file to download is: ");
    }

    if (!fs.existsSync(path.join(__dirname, "routes", "trainedData", "urd.traineddata.gz"))) {
      console.time("total time taken for urdu file to download is: ");
      //   const trainFile = ;
      console.log("File download started for file urdu trained data");
      try {
        await downloadFile("https://github.com/naptha/tessdata/blob/gh-pages/4.0.0/urd.traineddata.gz?raw=true", path.join(__dirname, "routes", "trainedData", "urd.traineddata.gz"));
        // console.log("Extracting urd.trainedData file");
        // gunzip(path.join(__dirname, "routes", "trainedData", "urd.traineddata.gz"), path.join(__dirname, "routes", "trainedData", "urd.traineddata"), () => {
        //   console.log('Extraction of urd.traineddata done!');
        // });
        // console.log("File download completed for urdu trained data");
        // console.log("Deleting the eng.traineddata.gz file");
        // fs.unlinkSync(path.join(__dirname, "routes", "trainedData", "urd.traineddata.gz"));
      } catch (error) {
        console.log(error);
      }
      console.timeEnd("total time taken for urdu file to download is: ");
    }

    if (!fs.existsSync(path.join(__dirname, "routes", "trainedData", "osd.traineddata"))) {
      console.time("Time taken for osd.traineddata is: ");
      try {
        await downloadFile("https://github.com/naptha/tessdata/blob/gh-pages/4.0.0/osd.traineddata.gz?raw=true", path.join(__dirname, "routes", "trainedData", "osd.traineddata.gz"));
        console.log("Extracting osd.trainedData file");
        gunzip(path.join(__dirname, "routes", "trainedData", "osd.traineddata.gz"), path.join(__dirname, "routes", "trainedData", "osd.traineddata"), () => {
          console.log('Extraction of osd.traineddata done!');
        });
        console.log("File download completed for osd trained data");
        console.log("Deleting the osd.traineddata.gz file");
        fs.unlinkSync(path.join(__dirname, "routes", "trainedData", "osd.traineddata.gz"));
      } catch (error) {
        console.log(error);
      }
      console.timeEnd("Time taken for osd.traineddata is: ");
    }
  } catch (error) {
    console.log(error);
  } finally {
    console.log("getTrainData completed");
    console.timeEnd("Total time taken to setup project is: ");
  }
};

module.exports = checkTrainData;
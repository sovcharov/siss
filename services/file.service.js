import * as fs from 'fs';
 import FsConfig from '../../sissconf/fsconfig.js';
const fsConfig = new FsConfig();

export class MyFileService {

  constructor() {

  }

   updateImage(company, image, partId, callback) {

    let file = `${__dirname}/${fsConfig.workDir}${company}-${partId}.png`;
    image = image.replace(/^data:;base64,/, "");
    image = Buffer.from(image, 'base64')
    // console.log('img: ',image);
    fs.writeFile(file, image, (err) => {
      if (err) {
        callback({ error: true });
      } else {
        callback({ done: true });
      }
    });
  }

   saveImage(file, image, callback) {
    file = `${__dirname}/${fsConfig.workDir}${file}.png`;
    image = image.replace(/^data:;base64,/, "");
    image = image.replace(/^data:application\/octet-stream;base64,/, "");
    image = image.replace(/^data:image\/png;base64,/, "");
    image = image.replace(/^data:image\/jpeg;base64,/, "");
    image = Buffer.from(image, 'base64')
    // console.log('img: ',image);
    fs.writeFile(file, image, (err) => {
      if (err) {
        callback({ error: true });
      } else {
        callback({ done: true });
      }
    });
  }

   deleteImage(file, callback) {
    file = `${__dirname}/${fsConfig.workDir}${file}.png`;
    // console.log(file);
    fs.unlink(file, (err) => {
      if (err) {
        console.log(err);
        callback({ error: true });
      } else {
        callback({ done: true });
      }
    });
  }


   getInventoryImage(fileName, index, callback) {

    let file = `${__dirname}/${fsConfig.workDir}${fileName}.png`;
    let readFile = function (file) {
      fs.readFile(file, (err, data) => {
        if (err) {
          callback({ error: true });
        }
        let image = Buffer.from(data).toString('base64');
        image = `data:;base64,${image}`;
        callback({ image: image }, index);
      })
    }

    if (!fs.existsSync(file)) {
      let file = `${__dirname}/${fsConfig.workDir}nophoto.png`;
      readFile(file);
    } else {
      readFile(file);
    }




    // console.log(file)
    // if (fs.existsSync(file)) {
    //   callback({exists:true});/etc/letsencrypt/live/seltex.ru/privkey.pem
    // }
  }

  getCertificates() {
    let privateKey = fs.readFileSync('/etc/letsencrypt/live/seltex.ru/privkey.pem');
    let certificate = fs.readFileSync('/etc/letsencrypt/live/seltex.ru/fullchain.pem');
    return { key: privateKey, cert: certificate };
  }

  getPriceListUpdateDate (callback) {
    data = {
      test: "test"
    };
    try {
      const stats = fs.statSync(`${__dirname}/${fsConfig.siteDir}files/test.xlsx`);
      const creationDate = stats.birthtime;
      console.log(`File was created on: ${creationDate}`);
      console.log(`Creation date in milliseconds: ${stats.birthtimeMs}`);
    } catch (err) {
      console.error('Error getting file stats synchronously:', err);
    }
    callback(data);
  }

}

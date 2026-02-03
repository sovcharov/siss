import AWSConfig from '../../sissconf/awsconfig.js';
const awsConfig = new AWSConfig();
import { S3Client } from '@aws-sdk/client-s3';

// AWS.config.update({
//     accessKeyId: awsConfig.id,
//     secretAccessKey: awsConfig.key
// });

const s3 = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: awsConfig.id, // Use environment variables
    secretAccessKey: awsConfig.key // Use environment variables
  }
});


export class MyAWSService {

  constructor() {

  }

   getPriceUpdateDate(callback) {
    s3.headObject({
      Bucket: 'pricelist.seltex.ru',
      Key: 'SeltexPrice.xlsx'
    },function (err, data) {
      if (err) {
        callback(err);
      }
      if (data) {
        callback(data)
      }
    });
  }

   uploadPrice(data, callback) {
    s3.putObject({
      Bucket: 'pricelist.seltex.ru',
      Key: 'SeltexPrice.xlsx',
      Body: data,
      ACL: '-read'
    },function (err, data) {
      if (err) {
        callback(err);
      }
      if (data) {
        callback("OK")
      }
    });
  }

   uploadCross(data, callback) {
    s3.putObject({
      Bucket: 'pricelist.seltex.ru',
      Key: 'SeltexCross.xlsx',
      Body: data,
      ACL: '-read'
    },function (err, data) {
      if (err) {
        callback(err);
      }
      if (data) {
        callback("OK")
      }
    });
  }

   getSiteMapUpdateDate(callback) {
    s3.headObject({
      Bucket: 'pricelist.seltex.ru',
      Key: 'sitemap.xml'
    },function (err, data) {
      if (err) {
        callback(err);
      }
      if (data) {
        callback(data)
      }
    });
  }

   uploadSiteMap(data, callback) {
    s3.putObject({
      Bucket: 'pricelist.seltex.ru',
      Key: 'sitemap.xml',
      Body: data,
      ACL: '-read'
    },function (err, data) {
      if (err) {
        callback(err);
      }
      if (data) {
        callback("OK")
      }
    });
  }


}

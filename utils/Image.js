import sharp from 'sharp';
import fs from 'fs';

const Image = {
  upload(base64, width, height, path) {
    const image = base64.replace(/^data:image\/\w+;base64,/, '');

    return new Promise((resolve, reject) => {
      sharp(new Buffer(image, 'base64')).resize(width, height)
        .toBuffer()
        .then(data => {
          fs.writeFile(`public/${path}`, data, { encoding: 'base64' }, (er) => {
            if (er === null) {
              resolve(`/static/${path}`);
            } else {
              reject(er);
            }
          });
        });
    });
  }
};

export default Image;

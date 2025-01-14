const fs = require('fs');
const path = require('path');
const { server } = require('../config');

class LocalStorageService {
  constructor(folder) {
    this._folder = folder;

    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }
  }

  writeFile(file, { filename }) {
    const target_filename = `${+new Date()}-${filename}`;
    const target_path = path.resolve(this._folder, target_filename);
    const fileStream = fs.createWriteStream(target_path);

    return new Promise((resolve, reject) => {
      fileStream.on('error', (error) => reject(error));
      file.pipe(fileStream);
      file.on('end', () => {
        const targetFileUrl = `http://${server.host}:${server.port}/albums/covers/${target_filename}`;
        resolve(targetFileUrl);
      });
    });
  }
}

module.exports = LocalStorageService;

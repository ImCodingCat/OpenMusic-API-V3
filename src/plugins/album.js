const path = require('path');
const AlbumApi = require('../api/albums');
const AlbumService = require('../services/AlbumService');
const AlbumValidator = require('../validator/album');

const LocalStorageService = require('../services/LocalStorageService');
const UploadValidator = require('../validator/upload');

const CacheService = require('../services/CacheService');

// Made by mdavap

function registerAlbum() {
  const albumService = new AlbumService();
  const localStorageService = new LocalStorageService(path.resolve(__dirname, '..', 'api', 'albums', 'covers'));
  const cacheService = new CacheService();

  return {
    plugin: AlbumApi,
    options: {
      albumService,
      localStorageService,
      cacheService,
      uploadValidator: UploadValidator,
      albumValidator: AlbumValidator,
    },
  };
}

module.exports = registerAlbum;

const path = require('path');
const { server } = require('../../config');

const routes = (handler) => [
  {
    method: 'POST',
    path: '/albums',
    handler: handler.createAlbum,
  },
  {
    method: 'POST',
    path: '/albums/{albumId}/covers',
    handler: handler.uploadAlbumCover,
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
        output: 'stream',
        maxBytes: server.max_upload_size,
      },
    },
  },
  {
    method: 'POST',
    path: '/albums/{albumId}/likes',
    handler: handler.addAlbumLike,
    options: {
      auth: 'user_jwt',
    },
  },
  {
    method: 'GET',
    path: '/albums',
    handler: handler.getAlbums,
  },
  {
    method: 'GET',
    path: '/albums/{albumId}/likes',
    handler: handler.getAlbumLike,
  },
  {
    method: 'GET',
    path: '/albums/{albumId}',
    handler: handler.getAlbum,
  },
  {
    method: 'GET',
    path: '/albums/covers/{param*}',
    handler: {
      directory: {
        path: path.resolve(__dirname, 'covers'),
      },
    },
  },
  {
    method: 'PUT',
    path: '/albums/{albumId}',
    handler: handler.updateAlbum,
  },
  {
    method: 'DELETE',
    path: '/albums/{albumId}',
    handler: handler.deleteAlbum,
  },
  {
    method: 'DELETE',
    path: '/albums/{albumId}/likes',
    handler: handler.deleteAlbumLike,
    options: {
      auth: 'user_jwt',
    },
  },
];

module.exports = routes;

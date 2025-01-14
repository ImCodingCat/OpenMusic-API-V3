const routes = (handler) => [
  {
    method: 'POST',
    path: '/songs',
    handler: handler.createSong,
  },
  {
    method: 'GET',
    path: '/songs',
    handler: handler.getSongs,
  },
  {
    method: 'GET',
    path: '/songs/{songId}',
    handler: handler.getSong,
  },
  {
    method: 'PUT',
    path: '/songs/{songId}',
    handler: handler.updateSong,
  },
  {
    method: 'DELETE',
    path: '/songs/{songId}',
    handler: handler.deleteSong,
  },
];

module.exports = routes;

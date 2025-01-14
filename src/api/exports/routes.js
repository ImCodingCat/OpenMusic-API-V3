const routes = (handler) => [
  {
    method: 'POST',
    path: '/export/playlists/{playlistId}',
    handler: handler.exportPlaylist,
    options: {
      auth: 'user_jwt',
    },
  },
];

module.exports = routes;

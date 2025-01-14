const AlbumHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'albums',
  version: '1.0.0',
  register: async (server, {
    albumService, localStorageService, cacheService, uploadValidator, albumValidator,
  }) => {
    const Handler = new AlbumHandler(
      albumService,
      localStorageService,
      cacheService,
      uploadValidator,
      albumValidator,
    );
    server.route(routes(Handler));
  },
};

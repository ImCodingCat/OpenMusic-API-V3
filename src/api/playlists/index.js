const PlaylistHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'playlist',
  version: '1.0.0',
  register: async (server, {
    playlistService, songService, collaborationService, validator,
  }) => {
    const Handler = new PlaylistHandler(
      playlistService,
      songService,
      collaborationService,
      validator,
    );
    server.route(routes(Handler));
  },
};

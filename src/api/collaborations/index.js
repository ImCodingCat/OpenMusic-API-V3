const CollaborationHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'collaboration',
  version: '1.0.0',
  register: async (server, { collaborationService, playlistService, validator }) => {
    const Handler = new CollaborationHandler(collaborationService, playlistService, validator);
    server.route(routes(Handler));
  },
};

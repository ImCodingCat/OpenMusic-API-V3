const ExportHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'export',
  version: '1.0.0',
  register: async (server, { producerService, playlistService, validator }) => {
    const Handler = new ExportHandler(producerService, playlistService, validator);
    server.route(routes(Handler));
  },
};

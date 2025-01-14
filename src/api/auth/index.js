const AuthHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'auth',
  version: '1.0.0',
  register: async (server, {
    usersService, tokenService, tokenManager, validator,
  }) => {
    const Handler = new AuthHandler(usersService, tokenService, tokenManager, validator);
    server.route(routes(Handler));
  },
};

const routes = (handler) => [
  {
    method: 'POST',
    path: '/users',
    handler: handler.registerUser,
  },
  {
    method: 'POST',
    path: '/authentications',
    handler: handler.loginUser,
  },
  {
    method: 'PUT',
    path: '/authentications',
    handler: handler.refreshToken,
  },
  {
    method: 'DELETE',
    path: '/authentications',
    handler: handler.deleteToken,
  },
];

module.exports = routes;

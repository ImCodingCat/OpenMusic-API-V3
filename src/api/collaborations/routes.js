const routes = (handler) => [
  {
    method: 'POST',
    path: '/collaborations',
    handler: handler.addColaboration,
    options: {
      auth: 'user_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/collaborations',
    handler: handler.deleteCollaboration,
    options: {
      auth: 'user_jwt',
    },
  },
];

module.exports = routes;

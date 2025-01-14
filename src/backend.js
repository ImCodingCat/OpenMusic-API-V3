// Made by mdavap
// Backend server
require('dotenv').config();
const hapi = require('@hapi/hapi');
const jwt = require('@hapi/jwt');
const inert = require('@hapi/inert');

const registerAlbum = require('./plugins/album');
const registerSong = require('./plugins/song');
const registerPlaylist = require('./plugins/playlist');
const registerAuth = require('./plugins/auth');
const registerCollaboration = require('./plugins/collaboration');
const registerExport = require('./plugins/export');

const { RequestError } = require('./exceptions');

const config = require('./config');

const runBackend = async () => {
  const server = hapi.server({
    host: config.server.host,
    port: config.server.port,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.ext('onPreResponse', (request, h) => {
    const { response } = request;

    if (response instanceof RequestError) {
      const newResponse = h.response({
        status: 'fail',
        message: response.message,
      });
      newResponse.code(response.statusCode);
      return newResponse;
    }

    return h.continue;
  });

  await server.register([jwt, inert]);

  server.auth.strategy('user_jwt', 'jwt', {
    keys: config.auth.access_key,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      exp: true,
      maxAgeSec: config.auth.age,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: { userId: artifacts.decoded.payload.userId },
    }),
  });

  await server.register([
    registerAlbum(),
    registerSong(),
    registerPlaylist(),
    registerAuth(),
    registerCollaboration(),
    registerExport(),
  ]);

  await server.start();

  console.log(`Backend server ran at ${server.info.uri}`);
};

runBackend();

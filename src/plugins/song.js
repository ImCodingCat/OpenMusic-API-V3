const SongsApi = require('../api/songs');
const SongService = require('../services/SongService');
const SongValidator = require('../validator/song');
// Made by mdavap

function registerSong() {
  const Service = new SongService();

  return {
    plugin: SongsApi,
    options: {
      service: Service,
      validator: SongValidator,
    },
  };
}

module.exports = registerSong;

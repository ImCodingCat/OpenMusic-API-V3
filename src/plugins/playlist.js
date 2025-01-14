const PlaylistsApi = require('../api/playlists');
const PlaylistService = require('../services/PlaylistService');
const SongService = require('../services/SongService');
const CollaborationService = require('../services/CollaborationService');
const PlaylistValidator = require('../validator/playlist');
// Made by mdavap

function registerPlaylist() {
  const playlistService = new PlaylistService();
  const songService = new SongService();
  const collaborationService = new CollaborationService();

  return {
    plugin: PlaylistsApi,
    options: {
      playlistService,
      songService,
      collaborationService,
      validator: PlaylistValidator,
    },
  };
}

module.exports = registerPlaylist;

const CollaborationApi = require('../api/collaborations');
const CollaborationService = require('../services/CollaborationService');
const PlaylistService = require('../services/PlaylistService');
const CollaborationValidator = require('../validator/collaboration');
// Made by mdavap

function registerCollaboration() {
  const collaborationService = new CollaborationService();
  const playlistService = new PlaylistService();

  return {
    plugin: CollaborationApi,
    options: {
      collaborationService,
      playlistService,
      validator: CollaborationValidator,
    },
  };
}

module.exports = registerCollaboration;

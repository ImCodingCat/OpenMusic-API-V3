const ExportApi = require('../api/exports');
const ProducerService = require('../services/ProducerService');
const PlaylistService = require('../services/PlaylistService');
const ExportValidator = require('../validator/export');
// Made by mdavap

function registerExport() {
  const playlistService = new PlaylistService();

  return {
    plugin: ExportApi,
    options: {
      playlistService,
      producerService: ProducerService,
      validator: ExportValidator,
    },
  };
}

module.exports = registerExport;

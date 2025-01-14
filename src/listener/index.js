const autoBind = require('auto-bind');

class Listener {
  constructor(playlistService, emailService) {
    this._playlistService = playlistService;
    this._emailService = emailService;

    autoBind(this);
  }

  async listen(message) {
    try {
      const { playlistId, targetEmail } = JSON.parse(message.content.toString());

      const playlist = await this._playlistService.getPlaylistSong(playlistId, false);
      const { accepted } = await this._emailService.sendEmail(
        targetEmail,
        JSON.stringify({ playlist }, null, 4),
      );

      if (accepted.length) {
        console.log(`Email has been sent to ${accepted[0]}`);
      }
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Listener;

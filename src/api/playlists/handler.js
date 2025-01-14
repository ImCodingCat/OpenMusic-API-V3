const autoBind = require('auto-bind');
const formatter = require('../../formatter');
// Made by mdavap

class PlaylistHandler {
  constructor(playlistService, songService, collaborationService, validator) {
    this._playlistService = playlistService;
    this._songService = songService;
    this._collaborationService = collaborationService;
    this._validator = validator;

    autoBind(this);
  }

  async checkPermission(playlistId, userId) {
    const notCollaborated = await this._collaborationService.checkCollaboration(playlistId, userId);
    if (notCollaborated) {
      await this._playlistService.checkPlaylist(playlistId, userId);
    }
  }

  async addPlaylist(request, h) {
    const { payload } = request;

    this._validator.validateAddPlaylist(payload);

    const { userId } = request.auth.credentials;
    const playlistId = await this._playlistService.addPlaylist(userId, payload);

    return h.response(formatter(true, undefined, { playlistId })).code(201);
  }

  async getPlaylist(request, h) {
    const { userId } = request.auth.credentials;
    const playlists = await this._playlistService.getPlaylist(userId);

    return h.response(formatter(true, undefined, { playlists })).code(200);
  }

  async deletePlaylist(request, h) {
    const { userId } = request.auth.credentials;
    const { playlistId } = request.params;

    await this._playlistService.checkPlaylist(playlistId, userId);
    await this._playlistService.deletePlaylist(playlistId);

    return h.response(formatter(true, 'Playlist has been deleted')).code(200);
  }

  async addPlaylistSong(request, h) {
    const { payload } = request;
    const { userId } = request.auth.credentials;
    const { playlistId } = request.params;

    this._validator.validatePlaylistSong(payload);

    await this.checkPermission(playlistId, userId);
    await this._songService.getSong(payload.songId);
    await this._playlistService.addPlaylistSong(playlistId, userId, payload);

    return h.response(formatter(true, 'Song has been added to playlist')).code(201);
  }

  async getPlaylistSong(request, h) {
    const { userId } = request.auth.credentials;
    const { playlistId } = request.params;

    const playlist = await this._playlistService.getPlaylistSong(playlistId);
    await this.checkPermission(playlistId, userId);

    return h.response(formatter(true, undefined, { playlist })).code(200);
  }

  async deletePlaylistSong(request, h) {
    const { payload } = request;
    const { userId } = request.auth.credentials;
    const { playlistId } = request.params;

    this._validator.validatePlaylistSong(payload);

    await this.checkPermission(playlistId, userId);
    await this._songService.getSong(payload.songId);
    await this._playlistService.deletePlaylistSong(playlistId, userId, payload);

    return h.response(formatter(true, 'Song has been deleted from playlist')).code(200);
  }

  async getPlaylistActivities(request, h) {
    const { userId } = request.auth.credentials;
    const { playlistId } = request.params;

    await this.checkPermission(playlistId, userId);

    const activities = await this._playlistService.getActivities(playlistId);

    return h.response(formatter(true, undefined, { playlistId, activities })).code(200);
  }
}

module.exports = PlaylistHandler;

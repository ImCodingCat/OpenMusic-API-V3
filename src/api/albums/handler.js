const autoBind = require('auto-bind');
const formatter = require('../../formatter');
// Made by mdavap

class AlbumHandler {
  constructor(albumService, localStorageService, cacheService, uploadValidator, albumValidator) {
    this._albumService = albumService;
    this._localStorageService = localStorageService;
    this._cacheService = cacheService;
    this._uploadValidator = uploadValidator;
    this._albumValidator = albumValidator;

    autoBind(this);
  }

  async uploadAlbumCover(request, h) {
    const { albumId } = request.params;
    const { cover } = request.payload;

    this._uploadValidator.validateHeader(cover.hapi.headers);
    const fileUrl = await this._localStorageService.writeFile(cover, cover.hapi);
    await this._albumService.addAlbumCover(albumId, fileUrl);

    return h.response(formatter(true, 'Sampul berhasil diunggah')).code(201);
  }

  async addAlbumLike(request, h) {
    const { userId } = request.auth.credentials;
    const { albumId } = request.params;

    await this._albumService.getAlbum(albumId, false);

    await this._albumService.addAlbumLike(userId, albumId);
    await this._cacheService.delete(`album_like:${albumId}`);

    return h.response(formatter(true, 'Like has been added')).code(201);
  }

  async createAlbum(request, h) {
    const { payload } = request;

    this._albumValidator.validate(payload);

    const albumId = await this._albumService.addAlbum(payload);

    return h.response(formatter(true, undefined, { albumId })).code(201);
  }

  async getAlbumLike(request, h) {
    const { albumId } = request.params;

    let likes = +(await this._cacheService.get(`album_like:${albumId}`));
    if (likes) {
      return h.response(formatter(true, undefined, { likes })).header('X-Data-Source', 'cache').code(200);
    }

    likes = +(await this._albumService.getAlbumLike(albumId));
    await this._cacheService.set(`album_like:${albumId}`, likes);

    return h.response(formatter(true, undefined, { likes })).code(200);
  }

  async getAlbums(request, h) {
    const albums = await this._albumService.getAlbum();

    return h.response(formatter(true, undefined, { albums })).code(200);
  }

  async getAlbum(request, h) {
    const { albumId } = request.params;

    const album = await this._albumService.getAlbum(albumId);

    return h.response(formatter(true, undefined, { album })).code(200);
  }

  async updateAlbum(request, h) {
    const { albumId } = request.params;
    const { payload } = request;

    this._albumValidator.validate(payload);

    const updatedAlbum = await this._albumService.updateAlbum(albumId, payload);

    return h.response(formatter(true, 'Album has been updated', { album: updatedAlbum })).code(200);
  }

  async deleteAlbum(request, h) {
    const { albumId } = request.params;

    await this._albumService.deleteAlbum(albumId);

    return h.response(formatter(true, 'Album has been deleted')).code(200);
  }

  async deleteAlbumLike(request, h) {
    const { userId } = request.auth.credentials;
    const { albumId } = request.params;

    await this._albumService.deleteAlbumLike(userId, albumId);
    await this._cacheService.delete(`album_like:${albumId}`);

    return h.response(formatter(true, 'Your like has been deleted')).code(200);
  }
}

module.exports = AlbumHandler;

const Joi = require('joi');
const { ValidationError } = require('../exceptions');
// Made by mdavap

const PlaylistSchema = Joi.object({
  name: Joi.string().required(),
});

const PlaylistSongSchema = Joi.object({
  songId: Joi.string().required(),
});

const Validator = {
  validateAddPlaylist: (payload) => {
    const validationResult = PlaylistSchema.validate(payload);
    if (validationResult.error) {
      throw new ValidationError(validationResult.error.message);
    }
  },
  validatePlaylistSong: (payload) => {
    const validationResult = PlaylistSongSchema.validate(payload);
    if (validationResult.error) {
      throw new ValidationError(validationResult.error.message);
    }
  },
};

module.exports = Validator;

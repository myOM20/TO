const mongoose = require('mongoose');

const placeSchema = mongoose.Schema({
  placeId: { type: Number, required: true, unique: true },
  cityName : String,
  placeName: String,
  info : String,
  imageUrl: String,
  location: String,
  distance: Number,
});

const Place = mongoose.model('Place', placeSchema , 'places');

module.exports = Place;

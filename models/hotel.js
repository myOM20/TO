const mongoose = require('mongoose') ;

const hotelSchema = mongoose.Schema({
    hotelId : {type : Number , require : true , unique : true},
    cityName : String,
    hotelName : {type : String , require : true },
    
    info : String,
    image1Url: String,
    image2Url: String,
    image3Url: String,
    location : String ,
    distance: Number,
    reservation : String ,
})
const Hotel = mongoose.model('Hotel' ,hotelSchema );

module.exports = Hotel
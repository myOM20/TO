const User = require('../models/user');
const Place = require('../models/place');
const Hotel = require('../models/hotel');
const { get, render } = require('express/lib/response');
const res = require('express/lib/response');

const getHome = (req, res, next) => {
  //console.log(req.session);

  User.findOne({ unique_id: req.session.userId }, (err, data) => {
    if (!data) {
      res.redirect('index1.ejs');
    } else {
      return res.render('index.ejs', {
        name: data.username,
        email: data.email,
      });
    }
  });
};

const getInitiatives = (req , res , next) =>{
  return res.render('Initiatives.ejs')
}

const getDevelopers = (req , res , next) =>{
  return res.render('Developers.ejs')
}

const getAboutPage = (req , res , next) =>{
  return res.render('aboutPage.ejs')
}

//Places 

const getPlace = (req, res) => {
  return res.render('place.ejs', { title: 'Add Place' });
};

const getAllPlaces = (req, res) => {
  Place.find({}, (err, data) => {
    if (err) {
      console.error(err.message);
      return next(err);
    }

    return res.render('places.ejs', {
      places: data,
    });
  });
};

const getUpdatePlace = (req, res) => {
  Place.findOne({ placeId: req.params.id }, (err, data) => {
    if (!err) {
      // console.log(data);
      res.render('place.ejs', {
        title: 'Update Place',
        place: data,
      });
    }
  });
};

const getAbhaPlaces = (req, res) => {
  Place.find({cityName:'Abha'}, (err,places)=> { 
    
    let chunk = []
    let chunkSize = 3
    for (let i =0 ; i < places.length ; i+=chunkSize) {
        chunk.push(places.slice( i, chunkSize + i))
    }
    //res.json(chunk)
     res.render('../views/Places/abha', {
         chunk : chunk,
        
         
         
     })
})
};


const getRejalAlmaaPlaces = (req, res) => {
  Place.find({cityName:'rejalalmaa'}, (err,places)=> { 
    
    let chunk = []
    let chunkSize = 3
    for (let i =0 ; i < places.length ; i+=chunkSize) {
        chunk.push(places.slice( i, chunkSize + i))
    }
    //res.json(chunk)
     res.render('../views/Places/RejalAlmaa', {
         chunk : chunk,
        
         
         
     })
})
};

const getallplacesnew =(req , res) =>{
  Place.find({cityName:'Abha'}, (err,places)=> { 
    
         let chunk = []
         let chunkSize = 3
         for (let i =0 ; i < places.length ; i+=chunkSize) {
             chunk.push(places.slice( i, chunkSize + i))
         }
         //res.json(chunk)
          res.render('../views/Places/new', {
              chunk : chunk,
             
              
              
          })
     })
};

  const getMuhailPlaces = (req, res) => {
    Place.find({cityName:'muhail'}, (err,places)=> { 
      
      let chunk = []
      let chunkSize = 3
      for (let i =0 ; i < places.length ; i+=chunkSize) {
          chunk.push(places.slice( i, chunkSize + i))
      }
      //res.json(chunk)
      res.render('../views/Places/Muhail', {
          chunk : chunk,
          
          
          
      })
  })
};

const getSodahlPlaces = (req, res) => {
  Place.find({cityName:'soda'}, (err,places)=> { 
    
    let chunk = []
    let chunkSize = 3
    for (let i =0 ; i < places.length ; i+=chunkSize) {
        chunk.push(places.slice( i, chunkSize + i))
    }
    //res.json(chunk)
     res.render('../views/Places/Sodah', {
         chunk : chunk,
        
         
         
     })
 })
};


const getNmasPlaces = (req, res) => {
  Place.find({cityName:'nmas'}, (err,places)=> { 
    
    let chunk = []
    let chunkSize = 3
    for (let i =0 ; i < places.length ; i+=chunkSize) {
        chunk.push(places.slice( i, chunkSize + i))
    }
    //res.json(chunk)
     res.render('../views/Places/nmas', {
         chunk : chunk,
        
         
         
     })
 })
};

const getHaridaPlaces = (req, res) => {
  Place.find({}, (err, data) => {
    if (err) {
      console.error(err.message);
      return next(err);
    }

    return res.render('../views/Places/Harida', {
      places: data,
    });
  });
};



const postPlace = (req, res, next) => {
  const data = req.body;

  const errors = {};

  console.log(data);

  if (!data.placeId) {
    errors.placeId = 'Id is required';
  }
  if (!data.cityName) {
    errors.cityName = 'city Name is required'
  }

  if (!data.placeName) {
    errors.placeName = 'Name is required';
  }

  if (!data.info) {
    errors.info = 'information is required';
  }

  if (!data.imageUrl) {
    errors.imageUrl = 'Image is required';
  }

  if (!data.location) {
    errors.location = 'Location is required';
  }

  if (!data.distance) {
    errors.distance = 'Distance is required';
  }
  

  if (!data._id) {
    if (Object.keys(errors).length !== 0) {
      return res.render('place.ejs', {
        title: 'Add Place',
        place: data,
        errors,
      });
    }

    const tourismPlace = new Place({
      placeId: data.placeId,
      cityName : data.cityName,
      placeName: data.placeName,
      info: data.info,
      imageUrl: data.imageUrl,
      location: data.location,
      distance: data.distance,
    });

    tourismPlace.save((err, data) => {
      if (err) {
        console.error(err.message);
        return next(err);
      }

      res.redirect('place/list');
    });
  } else {
    if (Object.keys(errors).length !== 0) {
      return res.render('place.ejs', {
        title: 'Update Place',
        place: data,
        errors,
      });
    }

    Place.findOneAndUpdate({ _id: data._id }, data, (err, data) => {
      if (err) {
        console.error(err.message);
        return next(err);
      }

      res.redirect('place/list');
    });
  }
};

const deletePlace = (req, res, next) => {
  Place.findOneAndRemove({ placeId: req.params.id }, (err) => {
    if (err) {
      console.error(err.message);
      return next(err);
    }

    res.redirect('/place/list');
  });
};



// Hotels


const getHotel = (req, res) => {
  return res.render('hotel.ejs', { title: 'Add Hotel' });
};


const getAllHotels = (req, res) => {
  Hotel.find({}, (err, data) => {
    if (err) {
      console.error(err.message);
      return next(err);
    }

    return res.render('hotels.ejs', {
      hotels: data,
    });
  });
};

const getUpdateHotel = (req, res) => {
  Hotel.findOne({ hotelId: req.params.id }, (err, data) => {
    if (!err) {
      // console.log(data);
      res.render('hotel.ejs', {
        title: 'Update Hotel',
        hotel: data,
      });
    }
  });
};

const getAbhaHotels = (req, res) => {
  Hotel.find({cityName:'abha'}, (err,hotels)=> { 
    
    let chunk = []
    let chunkSize = 3
    for (let i =0 ; i < hotels.length ; i+=chunkSize) {
        chunk.push(hotels.slice( i, chunkSize + i))
    }
    //res.json(chunk)
     res.render('../views/Hotels/Abha', {
         chunk : chunk,
        
         
         
     })
 })
};

const getRejalAlmaaHotels = (req, res) => {
  Hotel.find({}, (err, data) => {
    if (err) {
      console.error(err.message);
      return next(err);
    }

    return res.render('../views/Hotels/Errors', {
      hotels: data,
    });
  });
};

const getHaridaHotels = (req, res) => {
  Hotel.find({}, (err, data) => {
    if (err) {
      console.error(err.message);
      return next(err);
    }

    return res.render('../views/Hotels/Errors', {
      hotels: data,
    });
  });
};

const getMuhailHotels = (req , res , next)=>{
  Hotel.find({cityName:'muhail'}, (err,hotels)=> { 
    
    let chunk = []
    let chunkSize = 3
    for (let i =0 ; i < hotels.length ; i+=chunkSize) {
        chunk.push(hotels.slice( i, chunkSize + i))
    }
    //res.json(chunk)
     res.render('../views/Hotels/Muhail', {
         chunk : chunk,        
         
     });
});
};

const getSodaHotels = (req, res) => {
  Hotel.find({cityName:'soda'}, (err,hotels)=> { 
    
    let chunk = []
    let chunkSize = 3
    for (let i =0 ; i < hotels.length ; i+=chunkSize) {
        chunk.push(hotels.slice( i, chunkSize + i))
    }
    //res.json(chunk)
     res.render('../views/Hotels/Soda', {
         chunk : chunk,
        
         
         
     });
  });
};

const getNmasHotels = (req, res) => {
  Hotel.find({cityName:'nmas'}, (err,hotels)=> { 
    
    let chunk = []
    let chunkSize = 3
    for (let i =0 ; i < hotels.length ; i+=chunkSize) {
        chunk.push(hotels.slice( i, chunkSize + i))
    }
    //res.json(chunk)
     res.render('../views/Hotels/Muhail', {
         chunk : chunk,        
         
     });
  });
};



const postHotel = (req, res, next) => {
  const data = req.body;

  const errors = {};

  console.log(data);

  if (!data.hotelId) {
    errors.hotelId = 'Id is required';
  }

  if (!data.cityName) {
    errors.cityName = 'Name is required';
  }

  if (!data.hotelName) {
    errors.hotelName = 'Name is required';
  }

  if (!data.info) {
    errors.info = 'information is required';
  }

  if (!data.image1Url) {
    errors.image1Url = 'Image is required';
  }
  if (!data.image2Url) {
    errors.image2Url = 'Image is required';
  }
  if (!data.image3Url) {
    errors.image3Url = 'Image is required';
  }

  if (!data.location) {
    errors.location = 'Location is required';
  }

  if (!data.distance) {
    errors.distance = 'Distance is required';
  }

  if (!data.reservation) {
    errors.reservation = 'reservation is required';
  }

  if (!data._id) {
    if (Object.keys(errors).length !== 0) {
      return res.render('hotel.ejs', {
        title: 'Add Hotel',
        hotel: data,
        errors,
      });
    }

    const tourismHotel = new Hotel({
      hotelId: data.hotelId,
      hotelName: data.hotelName,
      cityName:data.cityName,
      info: data.info,
      image1Url: data.image1Url,
      image2Url: data.image2Url,
      image3Url: data.image3Url,
      location: data.location,
      distance: data.distance,
      reservation:data.reservation
    });

    tourismHotel.save((err, data) => {
      if (err) {
        console.error(err.message);
        return next(err);
      }

      res.redirect('hotel/list');
    });
  } else {
    if (Object.keys(errors).length !== 0) {
      return res.render('hotel.ejs', {
        title: 'Update Hotel',
        hotel: data,
        errors,
      });
    }

    Hotel.findOneAndUpdate({ _id: data._id }, data, (err, data) => {
      if (err) {
        console.error(err.message);
        return next(err);
      }
      res.redirect('hotel/list');
    });
  }
};

const deleteHotel = (req, res, next) => {
  Hotel.findOneAndRemove({ hotelId: req.params.id }, (err) => {
    if (err) {
      console.error(err.message);
      return next(err);
    }

    res.redirect('/hotel/list');
  });
};




module.exports = {
  getHome,
  getPlace,
  getAllPlaces,
  getUpdatePlace,
  postPlace,
  deletePlace,

  getAbhaPlaces,
  getRejalAlmaaPlaces,
  getMuhailPlaces,
  getSodahlPlaces,
  getNmasPlaces,
  getHaridaPlaces,
  getallplacesnew,

  

  getHotel,
  getAllHotels,
  postHotel,
  getUpdateHotel,
  deleteHotel,
  
  getAbhaHotels,
  getRejalAlmaaHotels,
  getMuhailHotels,
  getSodaHotels,
  getNmasHotels,
  getHaridaHotels,


  getInitiatives,
  getDevelopers,
  getAboutPage

};

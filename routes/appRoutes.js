const express = require('express');
const { route } = require('express/lib/application');

const appController = require('../controllers/appController');

const router = express.Router();

router.get('/home', appController.getHome);

router.get('/Initiatives' , appController.getInitiatives)
      .get('/Developers' , appController.getDevelopers)
      .get('/About', appController.getAboutPage)
      

router
  .get('/place', appController.getPlace)
  .get('/place/list', appController.getAllPlaces)
  .get('/place/:id', appController.getUpdatePlace)
  .get('/place/delete/:id', appController.deletePlace)
  .post('/place', appController.postPlace);

router.get('/abha', appController.getAbhaPlaces);
     

router
    .get('/RejalAlmaa', appController.getRejalAlmaaPlaces)
    .get('/Muhail', appController.getMuhailPlaces)
    .get('/Sodah', appController.getSodahlPlaces)
    .get('/Nmas', appController.getNmasPlaces)
    .get('/Harida', appController.getHaridaPlaces)
    .get('/placeNew' , appController.getallplacesnew)


router
  .get('/hotel', appController.getHotel)
  .get('/hotel/list', appController.getAllHotels)
  .get('/hotel/:id', appController.getUpdateHotel)
  .get('/hotel/delete/:id', appController.deleteHotel)
  .post('/hotel', appController.postHotel);

router
  .get('/AbhaHotels' , appController.getAbhaHotels)
  .get('/RejalAlmaaHotels' , appController.getRejalAlmaaHotels)
  .get('/MuhailHotels' , appController.getMuhailHotels)
  .get('/SodaHotels' , appController.getSodaHotels)
  .get('/NmasHotels',appController.getNmasHotels)
  .get('/HaridaHotels' , appController.getHaridaHotels)
  



module.exports = router;

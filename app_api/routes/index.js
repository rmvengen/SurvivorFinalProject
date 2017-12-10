var express             = require('express');
var router              = express.Router();
var ctrlGameData    = require('../controllers/game');
var ctrlSurvivorData     = require('../controllers/survivor');
var ctrlOmdbApi         = require('../controllers/omdbapi');
//var ctrl

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* TAKEOFF DATA */
router.get('/contestantsdata/:flaps/:weight', ctrlGameData.contestantsDataReadOne);
router.get('/contestantsdata', ctrlGameData.contestantsDataReadAll);
/* CLIMB DATA */
router.get('/tribesdata/:weight', ctrlGameData.tribesDataReadOne);
router.get('/tribesdata', ctrlGameData.tribesDataReadAll);

/* LANDING DATA */
router.get('/seasonsdata/:flaps/:weight', ctrlGameData.seasonsDataReadOne);
router.get('/seasonsdata', ctrlGameData.seasonsDataReadAll);

/* AIRPORT DATA */
router.get('/survivordata', ctrlGameData.survivorDataReadAll);


/* API KEYS */
router.get('/omdbapi/:lat/:lon', ctrlOmdbApi.getSurvivorData);


/*
var ctrlAirplaneData    = require('../controllers/airplane');
var ctrlAirportData     = require('../controllers/airport');
var ctrlDarkSkyApi     = require('../controllers/darkskyapi');
*/
module.exports = router;



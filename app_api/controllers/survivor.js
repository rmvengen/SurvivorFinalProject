var mongoose = require('mongoose');
var SurvivorData = mongoose.model('SurvivorData');

//utility method for the module
var sendJSONresponse = function(res, status, content)
{
    res.status(status);
    res.json(content);
}

/* GET all AirportData records */
module.exports.survivorDataReadAll = function(req, res)
{
  console.log("Finding all Survivor Data Records", req);
  
  SurvivorData
    .find({})
    .exec(function(err, survivorData){
      if(err){
        console.log(err);
        sendJSONresponse(res, 404, err);
      }
      console.log(survivorData);
      sendJSONresponse(res, 200, survivorData);
    });
}
var request = require('request');

//utility method for the module
var sendJSONresponse = function(res, status, content)
{
    res.status(status);
    res.json(JSON.parse(content));
    //res.json(content);
}

/* GET all API Key Values Values */
module.exports.getSurvivorData = function(req, res)
{
    console.log("Retrieving Key Store Values");
    
   // var lat = req.params.lat;
    //var lon = req.params.lon;
    var t = 'Survivor';
    var y = req.params.yearOfSeason;
 // var y = 2000;
    var omdburl = 'http://www.omdbapi.com/?t=' + t + '&y=' + y + process.env.OMDB_KEY
    //var omdburl = 'https://api.darksky.net/forecast/' + process.env.OMDB_KEY + 
            // '/' + lat + ',' + lon;
    
    request(omdburl, function(error, response, body){
        //console.log(body);
        sendJSONresponse(res, "200", body); 
    });

}
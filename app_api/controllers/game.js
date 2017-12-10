var mongoose = require('mongoose');
var TribesData = mongoose.model('TribesData');
var ContestantsData = mongoose.model('ContestantsData');
var SeasonsData = mongoose.model('SeasonsData');


//utility method for the module
var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
}

//// CLIMB DATA ////////////////////////////////////////////////////////////////
/* GET all ClimbData records */
module.exports.contestantsDataReadAll = function(req, res) {
    console.log("Finding all Contestants Data Records", req);

    ContestantsData
        .find({})
        .exec(function(err, contestantsData) {
            if (err) {
                console.log(err);
                sendJSONresponse(res, 404, err);
            }
            console.log(contestantsData);
            sendJSONresponse(res, 200, contestantsData);
        });
}

/* GET ClimbData by weight */
module.exports.contestantsDataReadOne = function(req, res) {
    console.log('Finding Contestants Data Record', req.params);
    if (req.params && req.params.weight) {
        TakeoffData
            .find({
                weight: req.params.weight
            })
            .exec(function(err, contestantsData) {
                if (!contestantsData) {
                    sendJSONresponse(res, 404, {
                        "message": "weight value not found"
                    });
                    return;
                }
                else if (err) {
                    console.log(err);
                    sendJSONresponse(res, 404, err);
                    return;
                }
                console.log(contestantsData);
                sendJSONresponse(res, 200, contestantsData);
            });
    }
    else {
        console.log('No weight value specified');
        sendJSONresponse(res, 404, {
            "message": "No weight value in request"
        });
    }
};

//// CLIMB DATA ////////////////////////////////////////////////////////////////
/* GET all ClimbData records */
module.exports.tribesDataReadAll = function(req, res) {
    console.log("Finding all tribes Data Records", req);

    TribesData
        .find({})
        .exec(function(err, tribesData) {
            if (err) {
                console.log(err);
                sendJSONresponse(res, 404, err);
            }
            console.log(tribesData);
            sendJSONresponse(res, 200, tribesData);
        });
}

/* GET ClimbData by weight */
module.exports.tribesDataReadOne = function(req, res) {
    console.log('Finding Tribes Data Record', req.params);
    if (req.params && req.params.weight) {
        TribesData
            .find({
                weight: req.params.weight
            })
            .exec(function(err, tribesData) {
                if (!tribesData) {
                    sendJSONresponse(res, 404, {
                        "message": "weight value not found"
                    });
                    return;
                }
                else if (err) {
                    console.log(err);
                    sendJSONresponse(res, 404, err);
                    return;
                }
                console.log(tribesData);
                sendJSONresponse(res, 200, tribesData);
            });
    }
    else {
        console.log('No weight value specified');
        sendJSONresponse(res, 404, {
            "message": "No weight value in request"
        });
    }
};

//// LANDING DATA //////////////////////////////////////////////////////////////
/* GET LandingData by weight */
module.exports.seasonsDataReadOne = function(req, res) {
    console.log('Finding Seasons Data Record', req.params);
    if (req.params && req.params.weight && req.params.flaps) {
        

        //obtain the given weight value
        var givenWeight = req.params.weight;
        
        //weight selected from interpolation below
        var selectedWeight = 0;        

        //find the min weight in the data - returns a Promise
        var minWeight = SeasonsData.aggregate([ 
            {
                $group: 
                {
                    _id: null, 
                    minValue: { 
                        $min : "$weight" 
                        
                    }
                
                }
            }]
        ).exec();
        
        //find the max weight in the data - returns a Promise
        var maxWeight = SeasonsData.aggregate([ 
            {
                $group: 
                {
                    _id: null, 
                    maxValue: { 
                        $max : "$weight" 
                        
                    }
                
                }
            }]
        ).exec();

        //find the closest number below - returns a Promise
        var closestBelow = SeasonsData.find({
            'weight': {
                $lte: givenWeight
            }
        })
        .sort({
            'weight': -1
        })
        .limit(1)
        .exec();
        
        //find the closest number above - returns a Promise
        var closestAbove = SeasonsData.find({
            'weight': {
                $gte: givenWeight
            }
        })
        .sort({
            'weight': 1
        })
        .limit(1)
        .exec();         

        //using promises to chain these together - http://mongoosejs.com/docs/promises.html
        //and here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
        Promise.all([minWeight, maxWeight, closestBelow, closestAbove])
            //that is a lambda expression below - a shortcut for a function
            .then( results => {
                //console.log(results);
                
                var below = results[2][0].weight;
                console.log("below: " + below);
                
                var above = results[3][0].weight;
                console.log("above: " + above);
                
                //which is smaller?
                var sequence = [Math.abs(givenWeight - below), Math.abs(givenWeight - above)];
                
                console.log("difference between given weight and lower: " + sequence[0]);
                console.log("difference between given weight and hight: " + sequence[1]);
                
                //magic - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply
                var lowval = Math.min.apply(Math, sequence);
                
                console.log("low value: " + lowval);                
                
                var key = sequence.indexOf(lowval);
                
                console.log("key: " + key);
                
                var selectedWeight = 0;
                
                switch(key){
                    case 0:
                        selectedWeight = below;
                        break;
                    case 1:
                        selectedWeight = above;
                        break;
                }
                
                console.log("Selected Weight: " + selectedWeight);
                
                SeasonsData
                    .find({
                        'flaps': req.params.flaps,
                        'weight': selectedWeight
                    })
                    .exec(function(err, seasonsData) {
                        if (!seasonsData) {
                            sendJSONresponse(res, 404, {
                                "message": "weight value not found"
                            });
                            return;
                        }
                        else if (err) {
                            console.log(err);
                            sendJSONresponse(res, 404, err);
                            return;
                        }
                        
                        console.log(seasonsData);
                        sendJSONresponse(res, 200, seasonsData);
                    });                
                
            }
        );
    }
    else {
        console.log('No weight value specified');
        sendJSONresponse(res, 404, {
            "message": "No weight value in request"
        });
    }
};

/* GET all ClimbData records */
module.exports.seasonsDataReadAll = function(req, res) {
    console.log("Finding all Landing Data Records", req);

    SeasonsData
        .find({})
        .exec(function(err, tribesData) {
            if (err) {
                console.log(err);
                sendJSONresponse(res, 404, err);
            }
            console.log(tribesData);
            sendJSONresponse(res, 200, tribesData);
        });
}
var mongoose = require('mongoose');

var TribeSchema = new mongoose.Schema({
    originalTribe: String,
    firstSwitchTribe: String,
    secondSwitchTribe: String,
    Eliminated: String,
    Dissolution: String,
    DissolutionAndSwitch: String,
    mergeTribe: String
})


var SurvivorSchema = new mongoose.Schema({
	seasonName: String,
	contestantName: String,
	tribe: [TribeSchema]
});

mongoose.model('SurvivorData', SurvivorSchema, 'SurvivorData');


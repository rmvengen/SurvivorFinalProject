var mongoose = require('mongoose');

var TribesSchema = new mongoose.Schema({
	seasonLocation: String,
	contestantName: String,
});

mongoose.model('TribesData', TribesSchema, 'TribesData');

var ContestantsSchema = new mongoose.Schema({
	contestantName: String,
	Age: Number,
	seasonName: String,
	livingLocationCity: String,
	livingLocationState: String,
	finish: Number,
});



mongoose.model('ContestantsData', ContestantsSchema, 'ContestantsData');

var SeasonsSchema = new mongoose.Schema({
	seasonName: String,
	seasonNumber: Number,
	seasonLocation: String,
	yearOfSeason: Number,
	monthOfSeason: String,
});


mongoose.model('SeasonsData', SeasonsSchema, 'SeasonsData');
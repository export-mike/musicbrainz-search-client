var Uri = require('url');
var formatQueryString = require('querystring');

var requestService = require('./lib/requestService');

var WEBSERVICE_VERSION = '/ws/2/';
var RECORDING = 'recording/';
var FORMAT = 'xml';

var MusicBrainzClient = function(options) {
	this.musicbrainzServerUrl = options.musicbrainzServerUrl || 'https://search.musicbrainz.org';
	this.baseUrl = Uri.resolve(this.musicbrainzServerUrl, WEBSERVICE_VERSION);
};

MusicBrainzClient.prototype.searchRecording = function(options, callback) {
	var url = Uri.resolve(this.baseUrl, RECORDING);
	
	var queryString = formatQueryString.stringify({
		fmt:FORMAT,
		max: options.max || 2,
		query: 'recording:' + options.recording + ' AND artist:' + options.artist
	});

	// var searchString = '';

	// for (var searchKey in options) {
	// 	if (searchString) {
	// 		searchString += ' AND ';
	// 	}

	// 	searchString += searchKey + ':' + options[searchKey].replace(/[+\-&|!(){}\[\]^"~*?:\\]/gi, '');

	// }
	//http://mb.trackstack.co:8080/ws/2/recording/?max=2&type=recording&fmt=xml&offset=0&query=artist:%22Snow%20Patrol%22%20AND%20recording:%22An%20Olive%20Grove%20Facing%20the%20Sea%20(2009%20Version)%22
	
	// var encodedSearchString = encodeURIComponent(searchString).replace(/'/g, '%27').replace(/"/g, '%22');

	// console.log('URI %s', this.musicbrainzServerUrl + WEBSERVICE_VERSION + 'recording:"' + QUERY_STRING_PART.replace('{VALUE}', encodedSearchString));


	requestService.get({
		uri: url + queryString,
	}, callback);
};


var mb = new MusicBrainzClient({
	musicbrainzServerUrl: 'http://mb.trackstack.co:8080'
});
console.time('search');

mb.searchRecording({
	artist: 'coldplay',
	recording: 'fix you'
}, function(err, result) {

	console.log('ERROR: ' + JSON.stringify(err));
	console.timeEnd('search');
	console.log('RESULT: ' + JSON.stringify(result));

});
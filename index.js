'use strict';

var request = require('request');
var parseXmlString = require('xml2js').parseString;

request('http://mb.trackstack.co/ws/2/recording?query=wonderwall', function(err, response, body){
	if(err){
		console.log(err);	
		return;
	} 

	if(response.statusCode === 200){
		parseXmlString(body, function(err, parsedBody){
			if(err){
				console.log(err);
				return;
			}

			console.log(parsedBody);
		});
	};
});
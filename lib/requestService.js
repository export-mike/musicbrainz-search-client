'use strict';

var request = require('request');
var parseXmlString = require('xml2js').parseString;
var async = require('async');

exports.get = function(options, callback) {

	if(!options.uri){
		callback({error:'options uri required'});
		return;
	}

	var parseResponse = function (response, body, callback) {
		if(response.statusCode !== 200){
			callback({error:'Not OK Response', response: response, body: body});
			return;
		}

		parseXmlString(body,callback);
	};

	async.waterfall([
			function(callback){
				request(options.uri, callback);
			},
			parseResponse
		],function(err, result){
			callback(err, result);
		});
};
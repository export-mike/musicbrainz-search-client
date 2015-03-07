'use strict';

var request = require('request');
var camelCaseKeysRecursive = require('./camelcase-keys-recursive');

if (process.env.MUSICBRAINZ_CLIENT_DEBUG === 'development') {
	require('request-debug')(request);
}

var parseXmlString = require('xml2js').parseString;
var async = require('async');

exports.get = function(options, callback) {
	if (!options.uri) {
		callback({
			error: 'options uri required'
		});
		return;
	}

	var parseResponse = function(response, body, callback) {

		if (response.statusCode !== 200) {
			callback({
				error: 'Not OK Response',
				response: response,
				body: body
			});
			return;
		}


		if (response.headers['content-type'] === 'application/xml') {
			
			async.waterfall([
				function(fn) {
					parseXmlString(body, fn);
				},
				camelCaseBody,
				assembleObjects
			], callback);

		}else{

			callback(null, body);
		}

	};

	var camelCaseBody = function(body, callback) {
		console.time('camelCaseBody');
		var bodyCamelCased = camelCaseKeysRecursive(body);
		console.timeEnd('camelCaseBody');
		callback(null, bodyCamelCased);
	};



	var assembleObjects = function(body, callback) {
		// console.log(JSON.stringify(body));
		callback(null, body);
		// var recordingList = body.hasOwnProperty('metadata') ? body.metadata.recordingLi
	};

	async.waterfall([
		function(callback) {
			request(options.uri, callback);
		},
		parseResponse
	], function(err, result) {
		callback(err, result);
	});
};
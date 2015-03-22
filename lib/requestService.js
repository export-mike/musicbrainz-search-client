'use strict';

var request = require('request');
var camelCaseKeysRecursive = require('camelcase-keys-recursive');

if (process.env.MUSICBRAINZ_CLIENT_DEBUG === 'development') {
	require('request-debug')(request);
}

var parseXmlString = require('xml2js').parseString;
var async = require('async');

var internals = {};

exports.get = internals.get = function(options, callback) {

	if (!options.uri) {
		callback({
			error: 'options uri required'
		});
		return;
	}

	async.waterfall([
		function(callback) {
			request(options.uri, callback);
		},
		internals.parseResponse
	], function(err, result) {
		callback(err, result);
	});
};

internals.parseResponse = function(response, body, callback) {

	if (response.statusCode !== 200) {
		callback({
			error: 'Not OK Response',
			response: response,
			body: body
		});
		return;
	}

	if (response.headers['content-type'] === 'application/xml;charset=UTF-8') {

		async.waterfall([
			function(fn) {
				parseXmlString(body, fn);
			},

			internals.camelCaseBody

		], callback);

	} else if (response.headers['content-type'] === 'application/json;charset=UTF-8') {

		body = JSON.parse(body);
		internals.camelCaseBody(body, callback);

	} else {

		callback(null, body);
	}

};

internals.camelCaseBody = function(body, callback) {
	callback(null, camelCaseKeysRecursive(body));
};
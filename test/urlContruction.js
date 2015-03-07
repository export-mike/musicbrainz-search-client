'use strict';

var expect = require('chai').expect;
var Recording = require('../lib/recording');

describe('Recording Url Construction', function() {

	it('BaseUrl Matches one provided in constructor', function() {
		var recording = new Recording({
			searchServer: 'http://search.domain.com'
		});

		expect('http://search.domain.com/ws/2/recording/').to.equal(recording.baseUrl);
	});

	it('BaseUrl Matches default', function() {
		var recording = new Recording();

		expect('https://search.musicbrainz.org/ws/2/recording/').to.equal(recording.baseUrl);
	});

	//?max=2&type=recording&fmt=xml&offset=0&query=artist:"jack%20johnson" AND recording:breakdown


	it('Query has artist parameters', function() {
		var recording = new Recording();


		expect('artist:"Jack Johnson"').to.equal(recording.search({
			artist: 'Jack Johnson'
		}).query);

	});

	it('Query has artist and recording parameters', function() {
		var recording = new Recording();


		expect('artist:"Jack Johnson" AND recording:"breakdown"').to.equal(recording.search({
			artist: 'Jack Johnson',
			recording: 'breakdown'
		}).query);

	});
});
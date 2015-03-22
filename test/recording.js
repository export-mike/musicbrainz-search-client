'use strict';

var expect = require('chai').expect;
var Recording = require('../lib/recording');

describe('Recording Url Construction', function() {

	it('BaseUrl Matches one provided in constructor', function() {
		var recording = new Recording({
			searchServer: 'http://search.domain.com'
		});

		expect(recording.baseUrl).to.equal('http://search.domain.com/ws/2/recording/');
	});

	it('BaseUrl Matches default', function() {
		var recording = new Recording();

		expect(recording.baseUrl).to.equal('https://search.musicbrainz.org/ws/2/recording/');
	});

	it('Query has artist parameters', function() {
		var recording = new Recording();


		expect(recording._createQueryValue({
			artist: 'Jack Johnson'
		})).to.equal('artist:"Jack Johnson"');

	});

	it('Query has artist and recording parameters', function() {
		var recording = new Recording();
		
		expect(recording._createQueryValue({
			artist: 'Jack Johnson',
			recording: 'breakdown'
		})).to.equal('artist:"Jack Johnson" AND recording:"breakdown"');

	});

	it('Create full Url', function(){
		var recording = new Recording({max:2, format:'xml'});

		recording._createQueryValue({
			artist: 'Jack Johnson!',
			recording: 'breakdown'
		});

		expect(recording._createFullUrl()).
		to.equal('https://search.musicbrainz.org/ws/2/recording/?max=2&type=recording&fmt=xml&offset=0&query=artist%3A%22Jack%20Johnson!%22%20AND%20recording%3A%22breakdown%22');
	});
});
'use strict';

var expect = require('chai').expect;
var Release = require('../lib/release');

describe('Release Url Construction', function() {

	it('BaseUrl Matches one provided in constructor', function() {
		var release = new Release({
			searchServer: 'http://search.domain.com'
		});

		expect(release.baseUrl).to.equal('http://search.domain.com/ws/2/release/');
	});

	it('BaseUrl Matches default', function() {
		var release = new Release();

		expect(release.baseUrl).to.equal('https://search.musicbrainz.org/ws/2/release/');
	});

	it('Query has artist parameters', function() {
		var release = new Release();


		expect(release._createQueryValue({
			artist: 'Jack Johnson'
		})).to.equal('artist:"Jack Johnson"');

	});

	it('Query has artist and recording parameters', function() {
		var release = new Release();
		
		expect(release._createQueryValue({
			artist: 'Jack Johnson',
			recording: 'breakdown'
		})).to.equal('artist:"Jack Johnson" + recording:"breakdown"');

	});

	it('Create full Url', function(){
		var release = new Release({max:2, format:'xml'});

		release._createQueryValue({
			artist: 'Jack Johnson!',
			recording: 'breakdown'
		});

		expect(release._createFullUrl()).
		to.equal('https://search.musicbrainz.org/ws/2/release/?max=2&type=release&fmt=xml&offset=0&query=artist%3A%22Jack%20Johnson!%22%20%2B%20recording%3A%22breakdown%22');
	});
});
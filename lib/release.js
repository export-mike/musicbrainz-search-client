'use strict';

var BaseResource = require('./baseResource');
var Url = require('url');

var internals = {};

exports = module.exports = internals.Recording = function (){
	BaseResource.prototype.constructor.apply(this, arguments);
	this.type = 'release';
	this.baseUrl = Url.resolve(this.baseUrl, this.type + '/');

};

internals.Recording.prototype = Object.create(BaseResource.prototype);
internals.Recording.constructor = internals.Recording;
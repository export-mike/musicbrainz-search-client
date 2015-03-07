var Defaults = require('./defaults');
var DefineFields = require('./defineFields');
var Url = require('url');


var internals = {};

exports = module.exports = internals.BaseResource = function (options){
	options = options || {};

	this._defineFields(['searchServer', 'baseUrl', 'query', 'max', 'type', 'fmt', 'offset']);

	this.searchServer = options.searchServer || Defaults.DEFAULT_MIRROR;
	this.baseUrl = Url.resolve(this.searchServer, Defaults.WEBSERVICE_VERSION);
	this.query = '';
	this.max = options.max || Defaults.MAX_RESPONSE;
	this.fmt = options.format || Defaults.FORMAT;
	this.offset = options.offset || Defaults.OFFSET;
};

internals.BaseResource.prototype._defineFields = DefineFields;
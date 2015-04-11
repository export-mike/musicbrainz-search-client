'use strict';

var Defaults = require('./defaults');
var DefineFields = require('./defineFields');
var Url = require('url');
var RequestService = require('./requestService');
var QuerySting = require('querystring');


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
	this.joinType = options.joinType || Defaults.JOIN_TYPE;
};

internals.BaseResource.prototype._defineFields = DefineFields;

internals.BaseResource.prototype.search = function(options, callback){
	this._createQueryValue(options);
	this._createFullUrl();
	RequestService.get({
		uri: this.fullUrl
	}, callback);
};


internals.BaseResource.prototype._createQueryValue = function(options){
	var _this = this;
	var queryParameters = Object.keys(options);

	var queryValue = '';

	queryParameters.forEach(function(queryParameter, index){

		if(queryParameters.length > 1 && index !== queryParameters.length -1){
			queryValue += queryParameter.toLowerCase() + ':"'+options[queryParameter]+_this.joinType;
		}else{
			queryValue += queryParameter.toLowerCase() + ':"'+options[queryParameter]+'"';
		}
		
	});

	this.query = queryValue;
	return queryValue;
};

internals.BaseResource.prototype._createFullUrl = function(){
	var fullUrl = '';
	var queryString = '';

	var queryObject = {
		max: this.max,
		type: this.type,
		fmt: this.fmt,
		offset: this.offset,
		query: this.query
	};

	queryString = QuerySting.stringify(queryObject);


	fullUrl = this.baseUrl + '?' + queryString;

	this.fullUrl = fullUrl;
	console.log(fullUrl);
	return fullUrl;
};
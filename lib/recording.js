var BaseResource = require('./baseResource');
var Url = require('url');
var QuerySting = require('querystring');

var internals = {};

exports = module.exports = internals.Recording = function (){
	BaseResource.prototype.constructor.apply(this, arguments);
	this.type = 'recording';
	this.baseUrl = Url.resolve(this.baseUrl, this.type + '/');

};

internals.Recording.prototype = Object.create(BaseResource.prototype);
internals.Recording.constructor = internals.Recording;

internals.Recording.prototype._createQueryValue = function(options){
	var queryParameters = Object.keys(options);

	var queryValue = '';

	queryParameters.forEach(function(queryParameter, index){

		if(queryParameters.length > 1 && index !== queryParameters.length -1){
			queryValue += queryParameter.toLowerCase() + ':"'+options[queryParameter]+'" AND ';
		}else{
			queryValue += queryParameter.toLowerCase() + ':"'+options[queryParameter]+'"';
		}
		
	});

	this.query = queryValue;
	return queryValue;
};

internals.Recording.prototype._createFullUrl = function(){
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
	return fullUrl;
};
var BaseResource = require('./baseResource');
var Url = require('url');

var internals = {};

exports = module.exports = internals.Recording = function (){
	BaseResource.prototype.constructor.apply(this, arguments);
	this.type = 'recording';
	this.baseUrl = Url.resolve(this.baseUrl, this.type + '/');
};

internals.Recording.prototype = Object.create(BaseResource.prototype);
internals.Recording.constructor = internals.Recording;

internals.Recording.prototype.search = function(options){
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
	return this;
};
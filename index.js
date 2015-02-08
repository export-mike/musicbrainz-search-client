var requestService = require('./lib/requestService');

requestService.get({uri:'http://mb.trackstack.co/ws/2/recording?query=wonderwall\!'}, function (err, result) {
	console.log('ERROR: '+ err);
	console.log('RESULT: ' + result);
});
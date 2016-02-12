var fs = require('fs');

function say(filename, cb) {
	return fs.readFile(filename, function(err, contents){
		if (err) {
			cb(err);
		} else {
			setTimeout(function(){
				cb(null, contents);
			}, 1000);
		}
	});
}

module.exports.say = say;
const mongoose = require('mongoose');
const User = require('../models/schemas/user');
const config = require('../models/config');
var disconnect = false;

// open a mongoose connection iff it doesn't exist
if (mongoose.connection.readyState === 0) {
	console.log('opening mongoose connections...');
	mongoose.connect(config.dbUrl, { server: { socketOptions: { keepAlive: 120 } } });
	
	// close connection if running as standlone script
	disconnect = true;
}

User.find({ email: config.emailFromAddress }, function(err, admins) {
	if (err) {
		if (disconnect) mongoose.connection.close();
		return console.log(err);
	}
	if (admins.length) {
		if (disconnect) mongoose.connection.close();
		return;
	}
	
	console.log('could not find user ' + config.emailFromAddress);
	
	var newAdmin = new User({
		email: config.emailFromAddress,
		hash: config.emailPassword,
		isSuperAdmin: true,
		isAdmin: false,
		companyName: 'HSA'
	});
	
	newAdmin.save(function(err) {
		if (err) {
			if (disconnect) mongoose.connection.close();
			return console.log(err);
		}
		console.log('created user ' + config.emailFromAddress)
		if (disconnect) mongoose.connection.close();
		return;
	});
});
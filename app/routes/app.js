var User = require('../models/user-test');
var redis_client = require('redis').createClient();
redis_client.on("error", function (err) {
    console.log("Error " + err);
});

module.exports = function(app) {

	app.get('/', function(req, res){
		res.render('login', { 
			title: 'Welcome!', 
			message: req.flash('signinMessage') 
		});
	});

	app.get('/success', function(req, res){
		res.render('index', { title: 'Congrats!' });
	});

	app.get('/test', function(req, res){
		redis_client.lindex("logstash-redis", 1, function(err, ret) {
		redis_client.debug_mode = true;
		res.json(ret);
		});

		res.json({ name: 'zoe' });
	});

	app.get('/username', function(req, res){
		res.send(User.latest());
	});
};


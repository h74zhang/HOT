var User = require('../models/user-test');
var redis_client = require('redis').createClient();
redis_client.on("error", function (err) {
    console.log("Error " + err);
});

var redis_ready = false;
redis_client.on("ready", function (err) {
    redis_ready = true;
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

    app.get('/journal', function(req, res){
        var result_arr=[];
        if(redis_ready) {
            redis_client.lrange(req.query.vm_name, req.query.log_id, -1, function(err, ret) {
                redis_client.debug_mode = true;
                ret.forEach(function(e) {
                    result_arr.push(JSON.parse(e));
                });
                res.json(result_arr);
            });
        } else {
            res.send("");
        }
    });
        
    app.get('/username', function(req, res){
        res.send(User.latest());
    });
};


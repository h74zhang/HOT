var bcrypt = require('bcrypt');
var dottie = require('dottie');
var uuid   = require('node-uuid');
var jsonfile = require('jsonfile')
var load_user = require('./users.json');
var myfile = "app/models/users.json";
var users = [];


var User = function() {

    this._id = 0;
    this.fullName = '';
    this.email = '';

    this.local = {
        password: ''
    };
};
var latest_user = new User;

User.prototype.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

User.prototype.validPassword = function(password) {
    latest_user = this;
    return bcrypt.compareSync(password, this.local.password);
};

User.prototype.save = function(callback) {
    var foundUser = false;
    if ( this._id ) {
        for ( var i=0; i<users.length; i++ ) {
            var user = users[i];
            if ( user._id == this._id ) {
                foundUser = true;
                users[i].email = this.email;
                // ... other fields update
            }
        }
    }
    if (!foundUser) {
        this._id = uuid.v4();
        users.push(this);
        jsonfile.writeFileSync(myfile, users);
        latest_user = this;
    }
    callback();
};

User.findById = function(id,callback) {
    User.findOne({_id:id},callback);
};

User.findOne = function(query,callback) {
    var key = Object.keys(query)[0];
    var value = query[key];
    var foundUser = false;

    for ( var i=0; i<users.length; i++ ) {
        var user = users[i];    
        var userValue = dottie.get(user,key);

        if ( userValue == value ) {
            foundUser = user;
        }
    }
    callback(null, foundUser);  
};

User.findByEmailOrQuery = function(email,query,callback) {
    var key = Object.keys(query)[0];
    var value = query[key];
    var foundUser = false;
    for ( var i=0; i<users.length; i++ ) {
        var user = users[i];    
        var userValue = dottie.get(user,key);
        if ( userValue == value || user.email == email ) {
            foundUser = user;
        }
    }
    callback(null, foundUser);
};


User.latest = function() {
    return latest_user.fullName;
};

User.dump = function() {
    console.log(users);
};

var temp = new User;
console.log(load_user);
console.log(load_user.length);
for(var i = 0; i < load_user.length; i++) {
    users[i] = new User;
    users[i]._id = load_user[i]._id;
    users[i].fullName = load_user[i].fullName;
    users[i].email = load_user[i].email;
    users[i].local = load_user[i].local;
}
console.log(users);
module.exports = User;

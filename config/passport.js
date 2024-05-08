// ./config/passport.js

// Load local, facebook, and google authentication strategies
var localSt = require('passport-local').Strategy;
var googleSt = require('passport-google-oauth').OAuth2Strategy;
var bcrypt = require('bcrypt-nodejs');

// load the auth variables
var auth = require('./configuration');

module.exports = (passport) => {
  //serialize the user
  passport.serializeUser((user, done) => {
    module.exports.userID = user.id;
    done(null, user.id);
  });

  //deserialize the user
  passport.deserializeUser((id, done) => {
    auth.databaseConfig.connection.query("SELECT * FROM Users WHERE id = (?)", [id], (err, result) => {
      done(err, result[0]);
    })
  });

  //Passport uses username and password as default
  //In this case, username is overridden by email
  passport.use('local-signup', new localSt ({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  },
    
  (req, email, password, done) => {
    process.nextTick(() => {
      //Check if the user who is trying to login exist on the db
      var searchQuery = "SELECT email FROM Users WHERE email = (?)";
      auth.databaseConfig.connection.query(searchQuery, [email], (err, result) => {
        if (err) { return done(err);}
        
        //Check if there is a user with the same email
        if (result.length) {
          return done(null, false, req.flash('signupMessage','This email is already taken by someone.'));
        } else { //if there is no user with the same email
          var newSQLUser = new Object();

          newSQLUser.email = email;
          newSQLUser.password = password;

          var insertQuery = "INSERT INTO Users (profileid, token, email, password) VALUES (?)";
          var userValue = [,,email, bcrypt.hashSync(password, bcrypt.genSaltSync(8))];

          auth.databaseConfig.connection.query(insertQuery,[userValue], (err, result) => {
            if(err) throw err;
            console.log("User information is inserted in the table");
            
            console.log(result.insertId);
            newSQLUser.id = result.insertId;
            module.exports.NuserID = newSQLUser.id;
            return done(null, newSQLUser);
          });
        }
      }); 
    });
  }));

  passport.use('local-login', new localSt({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },

  (req, email, password, done) => {
    var searchQuery = "SELECT * FROM Users WHERE email = (?)";
    auth.databaseConfig.connection.query(searchQuery, [email], (err, result) => {
      if(err) {return done(err);}     //if there is any error return

      if(!result.length) {return done(null, false, req.flash('loginMessage', 'No users are found'));}

      if(!bcrypt.compareSync(password, result[0].password)) {return done(null, false, req.flash('loginMessage', 'Wrong password is entered'));}

      return done(null, result[0]);
    });
  }));

  //Google social login

  passport.use(new googleSt( {
    clientID: auth.googleLoginConfig.googleAuth.clientID,
    clientSecret: auth.googleLoginConfig.googleAuth.clientSecret,
    callbackURL: auth.googleLoginConfig.googleAuth.callbackURL,
    passReqToCallback: true
  },

  (req, token, refreshToken, profile, done) => {
    process.nextTick(() => {
      //check if the user is already loggin in
      var searchQuery = "SELECT * FROM Users WHERE profileid = (?)";
      auth.databaseConfig.connection.query(searchQuery, [profile.id], (err, result) => {
        if(err) {return done(err);}
        if(result.length) { 
          module.exports.check = true;
          return done(null, result[0]);
        } else {
          var newSQLUser = new Object();

          newSQLUser.profileid = profile.id;
          newSQLUser.token = token;
          newSQLUser.email = profile.emails[0].value;

          var insertQuery = "INSERT INTO Users (profileid, token, email, password) VALUES (?)";
          var userValue = [profile.id, token, profile.emails[0].value,null];

          auth.databaseConfig.connection.query(insertQuery,[userValue], (err, result) => {
            if(err) throw err;
            console.log("User information is inserted in the table");
            
            console.log(result.insertId);
            newSQLUser.id = result.insertId;
            module.exports.NuserID = newSQLUser.id;
            return done(null, newSQLUser);
          });
        }
      });
    });
  }));
};


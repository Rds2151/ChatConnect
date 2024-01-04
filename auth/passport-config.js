const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const users = require('../db/database').users

passport.use(
    new LocalStrategy(
        { usernameField: "contactNo" },
        async (contactNo, password, done) => {
            try {
                const user = users.find(user => user.contactNo === contactNo);
                if (!user) {
                    return done(null, false, "No user found with that phone number");
                }
            
                if (bcrypt.compareSync(password, user.Password)) {
                    return done(null, user);
                } else {
                    return done(null, false, "Incorrect password");
                }
            } catch (error) {
                return done(error);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.contactNo);
});

passport.deserializeUser(async (contactNo, done) => {
    try {
        const user = users.find(user => user.contactNo === contactNo);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

module.exports = passport;

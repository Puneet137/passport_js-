const passport = require('passport');

const googleStrategy = require('passport-google-oauth20');
const keys = require("./keys");
const user = require("../models/user-modal");
passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    })

})


passport.use(new googleStrategy({
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: "/auth/google/redirect"
}, (accessToken, refreshToken, profile, done) => {
    console.log("accessToken", accessToken);
    console.log("refreshToken", refreshToken);
    console.log("profile", profile);

    user.findOne({ googleId: profile.id }).then((currentUser) => {
        if (currentUser) {
            console.log("user is", currentUser)
            done(null, currentUser);
        } else {
            console.log("create new user");
            new User({
                username: profile.displayName,
                googleId: profile.id
            }).save().then((rewUser) => {
                console.log("new User");
                console.log(rewUser);
                done(null, rewUser);

            })

        }
    })


}));
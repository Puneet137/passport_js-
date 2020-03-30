const router = require('express').Router();
const passport = require('passport');
//const passportSetup = require('');

router.get("/login", (req, res) => {
    res.render("login");
})

//auth with google

const authCheck = (req, res, next) => {
    if (!req.user) {
        res.redidrect("/auth/login")
    } else {
        next();
    }
}
router.get("/home", authCheck, (req, res) => {
    res.render("login");
})

router.get('/google', passport.authenticate('google', { scope: ['profile'], accessType: 'offline' }))

router.get('/logout', (req, res) => {
    req.logout();
    res.send("logout");

})

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.send("done");
})

module.exports = router;
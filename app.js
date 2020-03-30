const express = require("express");
const authRoutes = require("./routes/auth-routes");
const passportSetup = require('./config/passport');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
const app = express();
const passport = require('passport');
const port = 3000;

app.set('view engine', 'ejs');

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: "qwerty"
}))

app.use(passport.initialize());
app.use(passport.session());
mongoose.connect(keys.mongodb.dbURI, () => {
    console.log("connected");
})
app.use("/auth", authRoutes);

app.get('/', (req, res) => {

    // res.send("hello world");
    res.render('html');
})

app.listen(port, () => {

    console.log(`server is listening at port ${port}`);

})
dotenv.config()
import express from 'express'; // web framework for Node.js
import session from 'express-session';
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import findOrCreate from 'mongoose-findorcreate';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors'; // allows cross origin resource sharing
import noteRoutes from './routes/note.js';
import dotenv from 'dotenv';
import User from '../server/models/user.js';


const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

const app = express();


app.use(bodyParser.json({limit: "20mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "20mb", extended: true}));

app.use(cors());
app.use('/notes', noteRoutes);


// sessions
app.use(session({
    secret: 'keyboard warrior',
    resave: false,
    saveUninitialized: false
}))

// passport middleware
app.use(passport.initialize());
app.use(passport.session());


// passport.use(User.createStrategy());
// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// });
// passport.deserializeUser(function(id, done) {
//   User.findById(id, function(err, user) {
//     done(err, user);
//   });
// });
// passport.use(new GoogleStrategy({
//     clientID: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     callbackURL: "http://localhost:4000/auth/google/callback",
//     userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     User.findOrCreate({ googleId: profile.id, username: profile.id }, function (err, user) {
//       return cb(err, user);
//     });
//   }
// ));


// // route middleware
// app.get("/auth/google",
//   passport.authenticate("google", { scope: ["profile"] })
// );
// app.get("/auth/google/callback",
//   passport.authenticate("google", { failureRedirect: "http://localhost:3000" }),
//   function(req, res) {
//     // Successful authentication, redirect secrets.
//     res.redirect("http://localhost:3000");
// });

// // logout option
// app.get("/logout", function(req, res){
//     res.redirect("http://localhost:3000/");
// });


mongoose.connect(CONNECTION_URL).then(() => app.listen(PORT, () => 
    console.log(`Connection is established and running on port: ${PORT}`)
)).catch((err) => console.log(err.message));

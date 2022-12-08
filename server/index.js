import express from 'express'; // web framework for Node.js
import session from 'express-session';
import passport from 'passport';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors'; // allows cross origin resource sharing
import noteRoutes from './routes/note.js';
import userRoutes from './routes/user.js';
import dotenv from 'dotenv';
import db from './config/db';

// load env variables
dotenv.config()


const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

const app = express();

// express app config
// parse requests of content-type - application/x-www-form-urlencoded
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: "20mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "20mb", extended: true}));
app.use(express.static(__dirname + "/../client/public"));
// app.use(cookieParser())


app.use(cors({
    origin: ['http://localhost:3000'],
    methods: 'GET, POST, PUT, DELETE, OPTIONS'
}));

// require routes
app.use('/notes', noteRoutes);
app.use('/user', userRoutes);


// sessions
app.use(session({
    secret: 'keyboard warrior',
    resave: false,
    saveUninitialized: false
}))

// passport middleware
app.use(passport.initialize());
app.use(passport.session());



// // logout option
// app.get("/logout", function(req, res){
//     res.redirect("http://localhost:3000/");
// });


mongoose.connect(CONNECTION_URL).then(() => app.listen(PORT, () => 
    console.log(`Connection is established and running on port: ${PORT}`)
)).catch((err) => console.log(err.message));

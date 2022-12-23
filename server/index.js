import express from 'express'; // web framework for Node.js
import session from 'express-session';
import cookieSession from 'cookie-session';
import passport from 'passport';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors'; // allows cross origin resource sharing
import noteRoutes from './routes/note.js';
import userRoutes from './routes/user.js';
import dotenv from 'dotenv';
// import db from '../server/config/db.js';

// load env variables
dotenv.config()


const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 5000;

const app = express();

// express app config
// parse requests of content-type - application/x-www-form-urlencoded
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: "20mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "20mb", extended: true}));
app.use(express.static("../../client/public"));



app.use(cors({
    origin: ['http://localhost:3000'],
    methods: 'GET, POST, PUT, DELETE, OPTIONS'
}));

// require routes
app.use('/notes', noteRoutes);
app.use('/user', userRoutes);


// sessions
app.use(cookieSession({
    secret: 'keyboard warrior',
    resave: false,
    saveUninitialized: false,
    sameSite: 'none', // must be 'none' to enable cross-site delivery
    secure: true, // must be true if sameSite='none'
    // cookie: {
    //     // sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax', // must be 'none' to enable cross-site delivery
    //     // secure: process.env.NODE_ENV === "production", // must be true if sameSite='none'
    //   }
}))

// enable the "secure" flag on the sessionCookies object
app.use((req, res, next)=>{
    req["sessionCookies"].secure = true;
    next();
});

// // logout option
// app.get("/logout", function(req, res){
//     res.redirect("http://localhost:3000/");
// });

mongoose.set("strictQuery", false);

mongoose.connect(MONGO_URL).then(() => app.listen(PORT, () => 
    console.log(`Connection is established and running on port: ${PORT}`)
)).catch((err) => console.log(err.message));



app.listen(PORT, function () {
    console.log(`Server Runs Perfectly at http://localhost:${PORT}`);
  });

// mongoose
//   .connect("mongodb://localhost:27017/Authentication", {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//   })
//   .then(() => console.log("mongoose connected"))
//   .catch((err) => console.log(err));

// const db = mongoose.connection;

// export default db;


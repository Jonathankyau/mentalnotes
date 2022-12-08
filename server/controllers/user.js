import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import fetch from 'node-fetch';
import User from '../models/User.js'; // load User model
import SignupValidation from '../validator/SignupValidation' // load input validation
import SigninValidation from '../validator/SigninValidation'


export default {
  // signup method to add a new user

  signup: async (req, res) => {
    const { name, email, password } = req.body;
    const { errors, isValid } = SignupValidation(req.body);

    try {
      if (!isValid) {
        res.status(404).json(errors);
      } else {
        await User.findOne({ email }).then(async (exist) => {
          if (exist) {
            errors.email = "Email already in use";
      return  res.status(404).json(errors);
          } else {
            const hashedpassword = await bcrypt.hash(password, 8);
            await User.create({
              name,
              email,
              password: hashedpassword,
            });
            res.status(201).json({ message: "user added with success" });
          }
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  },
  // signin method to add a new user
  signin: async (req, res) => {
    const { email, password } = req.body;
    const { errors, isValid } = SigninValidation(req.body);

    try {
      if (!isValid) {
        res.status(404).json(errors);
      } else {
        await User.findOne({ email }).then(async (user) => {
          if (!user) {
            errors.email =
              "Email does not exist! Please enter correct Email or make a new account.";
            return res.status(404).json(errors);
          }
          // Compare sent in password with found user hashed password
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) {
            errors.password = "Wrong Password";
            return res.status(404).json(errors);
          } else {
            // generate a token and send to client
            const token = jwt.sign({ _id: user._id }, "jkfett_DOING_GOOD", {
              expiresIn: "3d",
            });
            res.status(201).json({
              message: "Welcome " + user.name + " to your home page",
              token,
              user,
            });
          }
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  },
  // Google Authentication
  googleLogin: async (req, res) => {
    const client = new OAuth2Client(process.env.webClientId);
    const { idToken } = req.body;
    let response = await client.verifyIdToken({
      idToken,
      audience: process.env.webClientId,
    });
    const { email_verified, email, name } = response.payload;
    const image = response.payload.picture;
    if (email_verified) {
      let user = await User.findOne({ email });
      try {
        if (user) {
          const token = jwt.sign({ _id: user._id }, "jkfett_Still_Alive", {
            expiresIn: "3d",
          });
          return res.json({
            status: "Success",
            message: "Welcome " + user.name + " to your home page",
            user,
            token,
          });
        } else {
          let password = email + " jkfett_DOING_GOOD";
          const user = await User.create({
            name,
            email,
            password,
            image,
          });

          const token = jwt.sign({ _id: user._id }, "jkfett_DOING_GOOD", {
            expiresIn: "3d",
          });
          return res.json({
            status: "Success",
            message: "Welcome " + user.name + " to your home page",
            user,
            token,
          });
        }
      } catch (error) {
        console.log(error);
        res.status(400).send(error);
      }
    } else {
      return res.status(400).json({
        message: "Google login failed try again",
      });
    }
  },
  // Facebook Authentication
  FacebookLogin: async (req, res) => {
    try {
      console.log("FACEBOOK LOGIN REQ BODY", req.body);
      const { userID, accessToken } = req.body;
      const url = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email,picture&access_token=${accessToken}`;
      let response = await fetch(url, {
        method: "GET",
      });
      const data = await response.json();
      const { email, name } = data;
      const image = data.picture.data.url;
      let user = await User.findOne({ email });
      if (user) {
        const token = jwt.sign({ _id: user._id }, "jkfett_DOING_GOOD", {
          expiresIn: "3d",
        });
        return res.json({
          status: "Success",
          message: "Welcome " + user.name + " to your home page",
          user,
          token,
        });
      } else {
        let password = email + "jkfett_DOING_GOOD";
        const user = await User.create({
          name,
          email,
          password,
          image,
        });
        if (!user) {
          return res.status(400).json({
            error: "User signup failed with Facebook",
          });
        }
        const token = jwt.sign({ _id: user._id }, "jkfett_DOING_GOOD", {
          expiresIn: "3d",
        });
        return res.json({
          status: "Success",
          message: "Welcome " + user.name + " to your home page",
          user,
          token,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({
        error: "Facebook login failed. Try again later.",
      });
    }
  },
};
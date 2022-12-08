import express from 'express';
import UserController from '../controllers/user.js'
const router = express.Router();

// POST request for creating a new user.
router.post("/signup", UserController.signup);

// GET request for user login.
router.post("/signin", UserController.signin);

// POST request to handle the Google Login response.
router.post("/google-login", UserController.googleLogin);

// POST request to handle the Google Login response.
router.post("/facebook-login", UserController.FacebookLogin);

export default router;
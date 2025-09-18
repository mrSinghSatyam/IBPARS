import express from 'express';
import { signup, login } from '../Controllers/authController.js'; // Add .js extension
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

export default router;

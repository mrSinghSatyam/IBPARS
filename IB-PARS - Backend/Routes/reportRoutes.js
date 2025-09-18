import express from 'express';
import { submitReport, getReports } from '../Controllers/reportController.js'; 
const router = express.Router();

router.post('/', submitReport);
router.get('/', getReports);

export default router;

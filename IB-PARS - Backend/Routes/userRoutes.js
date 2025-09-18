// backend/routes/userRoutes.js
import express from 'express';
import upload from '../middlewares/upload.js'; // Import the upload middleware
import User from '../models/userModel.js'; // Assuming User model is in this path

const router = express.Router();

// Update Profile route
router.post('/update', upload.single('profilePic'), async (req, res) => {
  try {
    // Find the user by ID
    const user = await User.findById(req.body.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // If new profile picture is uploaded, update the profile pic field
    if (req.file) {
      user.profilePic = `/uploads/profile_pics/${req.file.filename}`; // Save relative path of image
    }

    // Update other user details
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    
    await user.save();

    res.status(200).json({
      message: 'Profile updated successfully',
      user
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

export default router;

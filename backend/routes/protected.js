const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/me', auth, (req, res) => {
  res.json({
    message: `Welcome to the Underworld, ${req.user.charonName}!`,
    user: req.user
  });
});

module.exports = router;

const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ res: 'Hello' });
});

module.exports = router;

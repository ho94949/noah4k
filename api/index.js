const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ res: 'Hello', error: undefined });
});

module.exports = router;

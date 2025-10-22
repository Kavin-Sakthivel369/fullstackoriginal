const express = require('express');
const { readData } = require('../utils/db');

const router = express.Router();

router.get('/', (req, res) => {
  const categories = readData('categories.json', []);
  res.json({ categories });
});

module.exports = router;

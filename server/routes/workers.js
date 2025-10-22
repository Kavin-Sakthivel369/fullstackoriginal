const express = require('express');
const { readData } = require('../utils/db');

const router = express.Router();

router.get('/', (req, res) => {
  const { category, area } = req.query;
  const workers = readData('workers.json', []);
  let result = workers;
  if (category && category !== 'All') {
    const lc = String(category).toLowerCase();
    result = result.filter((w) => (w.category || '').toLowerCase() === lc);
  }
  if (area && area !== 'All') {
    const la = String(area).toLowerCase();
    result = result.filter((w) => (w.area || '').toLowerCase() === la);
  }
  res.json({ workers: result });
});

module.exports = router;

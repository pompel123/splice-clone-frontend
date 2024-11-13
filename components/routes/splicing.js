// File: routes/splicing.js
const express = require('express');
const router = express.Router();

router.post('/calculate-loss', (req, res) => {
  const { spliceType, fiberType, spliceLength } = req.body;
  let loss;

  // Basic formula for fiber optic loss calculation
  if (spliceType === 'fusion') {
    loss = spliceLength * 0.05; // example loss coefficient for fusion
  } else if (spliceType === 'mechanical') {
    loss = spliceLength * 0.10; // example loss coefficient for mechanical
  } else {
    return res.status(400).send('Invalid splice type');
  }

  res.json({ loss });
});

module.exports = router;

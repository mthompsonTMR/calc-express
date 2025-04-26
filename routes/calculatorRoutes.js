const fs = require('fs').promises
const express = require('express');
const router = new express.Router();

const {
  convertAndValidateNumsArray,
  findMean,
  findMedian,
  findMode
} = require('../helpers');

router.get('/mean', (req, res, next) => {
  if (!req.query.nums) {
    const err = new Error('Nums are required.');
    err.status = 400;
    return next(err);
  }

  let numsAsStrings = req.query.nums.split(',');

  try {
    let nums = convertAndValidateNumsArray(numsAsStrings);
    let result = findMean(nums);

    return res.json({
      response: {
        operation: "mean",
        value: result
      }
    });
  } catch (e) {
    const err = new Error(e.message);
    err.status = 400;
    return next(err);
  }
});

router.get('/median', (req, res, next) => {
  if (!req.query.nums) {
    const err = new Error('Nums are required.');
    err.status = 400;
    return next(err);
  }

  let numsAsStrings = req.query.nums.split(',');

  try {
    let nums = convertAndValidateNumsArray(numsAsStrings);
    let result = findMedian(nums);

    return res.json({
      response: {
        operation: "median",
        value: result
      }
    });
  } catch (e) {
    const err = new Error(e.message);
    err.status = 400;
    return next(err);
  }
});

router.get('/mode', (req, res, next) => {
  if (!req.query.nums) {
    const err = new Error('Nums are required.');
    err.status = 400;
    return next(err);
  }

  let numsAsStrings = req.query.nums.split(',');

  try {
    let nums = convertAndValidateNumsArray(numsAsStrings);
    let result = findMode(nums);

    return res.json({
      response: {
        operation: "mode",
        value: result
      }
    });
  } catch (e) {
    const err = new Error(e.message);
    err.status = 400;
    return next(err);
  }
});
router.get('/all', async (req, res, next) => {
  if (!req.query.nums) {
    const err = new Error('Nums are required.');
    err.status = 400;
    return next(err);
  }

  let numsAsStrings = req.query.nums.split(',');
  let saveToFile = req.query.save === 'true'; // look for save=true in query

  try {
    let nums = convertAndValidateNumsArray(numsAsStrings);

    let mean = findMean(nums);
    let median = findMedian(nums);
    let mode = findMode(nums);

    const result = {
      response: {
        operation: "all",
        mean: mean,
        median: median,
        mode: mode
      }
    };

    if (saveToFile) {
      const timestamp = new Date().toISOString();
      const output = {
        timestamp,
        result: result.response
      };

      await fs.writeFile('results.json', JSON.stringify(output, null, 2));
    }

    const acceptHeader = req.headers.accept;

    if (acceptHeader && acceptHeader.includes('text/html')) {
      // Build a simple HTML response
      let html = `
        <h1>All Calculations</h1>
        <ul>
          <li>Mean: ${mean}</li>
          <li>Median: ${median}</li>
          <li>Mode: ${mode}</li>
        </ul>
      `;
      return res.send(html);
    } else {
      // Default: return JSON
      return res.json(result);
    } 
  } catch (e) {
    const err = new Error(e.message);
    err.status = 400;
    return next(err);
  }
});
 
module.exports = router;

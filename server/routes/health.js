const router = require('express').Router();
const catchAsync = require('../utils/catchAsync');
const ErrorHandler = require('../utils/appError');

router.get(
  '/',
  catchAsync(async (req, res, next) => {
  res.send("Health checked succeeded 🤟🏼 🤪")
}))

module.exports = router;

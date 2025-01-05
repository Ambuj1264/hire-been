const express = require('express');
const router = express.Router();
const withAuthRouter = require('./withAuth');
const withoutAuthRouter = require('./withoutAuth');
const verify = require('../middleware/authentication/verify.validation');

router.use('/auth', verify, withAuthRouter);
router.use('/', withoutAuthRouter);

module.exports = router;

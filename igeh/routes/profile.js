const express = require('express');
const router = express.Router();

const profileController = require('../app/api/controllers/profile');

router.get('/profile/testing', profileController.testing);
// router.post('/profile/post', profileController.post);
router.get('/profile/get', profileController.get);


module.exports = router;
const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
 
// Welcome Page
router.get('/',(req, res) => res.render('login'));

// Dashboard
router.get('/welcome', ensureAuthenticated, (req, res) => 
res.render('welcome', {
    name: req.user.name
}));

router.get('/rank', ensureAuthenticated, (req, res) => 
res.render('rank', {
    name: req.user.name
}));


module.exports = router; 
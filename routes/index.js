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

// // Dashboard
// router.get('/board', ensureAuthenticated, (req, res) => res.render('board', { name: req.user.name} ));

// router.get('/process/contentwriteform', function(req, res){
//     res.render('contentwrite.ejs');
// });

module.exports = router; 
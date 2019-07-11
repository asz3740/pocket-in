const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// User model
const User = require('../models/User');
// Login page
router.get('/login',(req,res) => res.render('login'));


// Register page
router.get('/register',(req,res) => res.render('register'));

// Register Handle
router.post('/register',(req,res) => {
    const { name, email, password, password2} = req.body;
    let errors = [];

    // Check required fields
    if(!name || !email || !password || !password2){
        errors.push({ msg: '빈칸이 있어요 건도씨'});
    }

    // Check passwords match
    if(password !== password2) {
        errors.push({ msg: '비밀번호가 맞지 않잖아요 건도씨' });
    }

    // Check pass length
    if(password.length < 6) {
        errors.push({ msg: '비밀번호는 6글자 이상 작성하세요 건도씨'});
    }

    if(errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    }else{
       // Validation passed
       User.findOne({ email: email })
         .then(user => {
             if(user) {
                // User exists 
                errors.push({ msg: '이메일이 틀렷어요 건도씨 (보안문제 괜찮나) '});
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
             }else{
                const newUser = new User({
                    name,
                    email,
                    password
                }); 

                // Hash Password
                bcrypt.genSalt(10, (err, salt) => 
                  bcrypt.hash(newUser.password, salt, (err, hash) =>{
                     if(err) throw err;
                     // Set password to hashed
                     newUser.password = hash;
                     // Save user
                     newUser.save()
                       .then(user => {
                           req.flash('success_msg', '회원가입 성공');
                           res.redirect('/users/login');
                       })
                       .catch(err => console.log(err));
                  }))
             }
         });
    }

});

// Login Handle
router.post('/login', (req, res, next) =>{
    passport.authenticate('local',{
        successRedirect: '/welcome',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

// Logout Handle
router.get('/logout', (req, res) => {
    req.logOut();
    req.flash('success_msg', '로그아웃 성공! 건도!');
    res.redirect('/users/login');
});

router.get('/');
module.exports = router;
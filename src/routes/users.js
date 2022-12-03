const express = require('express');
const router = express.Router();

const User = require('../models/User')

const passport = require('passport')

router.get('/users/signIn', (req, res) => {
    res.render('users/signIn');
});

router.post('/users/signIn', passport.authenticate('local', {
    successRedirect: '/notes',
    failureRedirect: '/users/signIn',
    failureFlash: true
}))

router.get('/users/signUp', (req, res) => {
    res.render('users/signUp');
});

router.post('/users/signUp', async (req, res) => {
    const { name, email, password, confirm_password } = req.body
    const errors = []
    if (name.length <= 0) {
        errors.push({ text: 'Please insert your name' })
    }
    if (password != confirm_password) {
        errors.push({ text: 'Password do not match' })
    }
    if (password.length < 4) {
        errors.push({ text: 'Password must be at least 4 characters' })
    }
    if (errors.length > 0) {
        res.render('users/signUp', { errors, name, email, password, confirm_password })
    } else {
        const emailUser = await User.findOne({ email: email })
        if (emailUser) {
            req.flash('error_msg', 'The Email is already in use')
            res.redirect('/users/signUp')
        }
        const newUser = new User({ name, email, password });
        newUser.password = await newUser.encryptPassword(password)
        await newUser.save()
        req.flash('success_msg', 'You are registered');
        res.redirect('/users/signIn')
    }
})

router.get('/users/logout', function (req, res) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
})

module.exports = router;
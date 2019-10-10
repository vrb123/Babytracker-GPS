const express = require('express');
const models = require('../models');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer')

const router = express.Router();

router.post('/signup',async (req,res) => {
    console.log(req.body);
    const {email,password: nonCryptedPass,phoneNumber,role = 'CUSTOMER'} = req.body;
    try{
        if( !email || !nonCryptedPass || !phoneNumber ) throw new Error('Усі поля повинні бути задані');

        const userWithTheSameEmail = await models.Customer.findOne({email});
        if(userWithTheSameEmail) throw new Error('Користувач з таким e-mail уже існує');

        const password = bcrypt.hashSync(nonCryptedPass,10);
        const user = await models.Customer.create({email,password,phoneNumber,role});
        res.json({
            ok: true,
            userId: user.id,
            role: user.role
        });
    }
    catch(err){
        console.log(err);
        res.json({
            ok: false,
        });
    }
});

router.post('/login', async (req,res) => {
    const {email,password} = req.body;
    try{
        if(!email || !password) throw new Error('Усі поля повинні бути задані');
        
        const user = await models.Customer.findOne({email});
        if(!user) throw new Error('No such user');
        if(!bcrypt.compareSync(password,user.password)) throw new Error('Невірний пароль');
        res.json({
            ok: true,
            userId: user.id,
            role: user.role
        });
    }
    catch(err){
        res.json({
            ok: false,
        });
    }
});

router.get('/reset/:token' , async (req,res) => {
    const {token} = req.params;
    console.log('Token: '+token);
    try {
        if(!token) throw new Error('No token provided');
        const user = await models.Customer.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: {
                $gt: Date.now()
            } 
        });
        if(!user) throw new Error('Invalid token or expired');
        console.log(user);
        res.json({
            ok: true,
            email: user.email
        });
    }
    catch(err){
        console.log('Err');
        console.log(err);
        res.json({
            ok: false
        })
    }
});

router.put('/updatePasswordViaEmail',async (req,res) => {
    const {email,password} = req.body;
    try{
        if(!email || !password) throw new Error('Empty fields');
        const user = await models.Customer.findOne({email});
        if(!user) throw new Error('No such user...');
        if(!user.resetPasswordToken) throw new Error('No token');
        const hashedPassword = bcrypt.hashSync(password,10);
        await user.update({
            password: hashedPassword,
            resetPasswordToken: null,
            resetPasswordExpires: null
        });
        res.json({
            ok: true
        });
    }
    catch(err){
        console.log(err);
        res.json({
            ok: false
        });
    }
});

router.post('/forgotPassword',async (req,res) => {
    const {email} = req.body;
    try {
        if(!email) throw new Error('No email provided...');
        const user = await models.Customer.findOne({email});
        if(!user) throw new Error('No such user...');
        const token = crypto
                            .randomBytes(20)
                            .toString('hex');
        await user.update({
            resetPasswordToken: token,
            resetPasswordExpires: Date.now() + 600000
        });
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'vitalij.vorobij@gmail.com',
                pass: 'Guitar18+'
            }
        });

        const mailOptions = {
            from: 'vitalij.vorobij@gmail.com',
            to: `${user.email}`,
            subject: 'Link to reset password',
            text:
                `You are receiving that because you have requested the reset of password\n\n`+
                `Please click on the folliwing link\n\n`+
                `http://localhost:3000/reset/${token}\n\n`
        };

        transporter.sendMail(mailOptions,(err,response) => {
            if(err) throw new Error('Error while sending email... '+err);
            else {
                console.log('OK');
                res.json({
                    ok: true
                })
            }
        })
    }
    catch(err){
        console.log(err);
        res.json({
            ok: false
        })
    }
});


module.exports = router;
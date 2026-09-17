const emailregx =/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const passwordregx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
const User = require('../models/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {sendVerificationEmail, forgotpasswordEmail} = require('../utils/emailsender');

let registrationController = async (req, res) => {

    let{fullname, email, password, confirmpassword, terms}= req.body

    let existinguser = await User.findOne({email})

    if(existinguser){
        return res.status(400).json({
            success: false,
            message: "User already exists"
        })
    }

    if(!fullname || !email || !password || !confirmpassword || !terms){
       return res.status(400).json({
        success: false,
        message: "All fields are required"
       })
    }

    if(password !== confirmpassword){
        return res.status(400).json({
            success: false,
            message: "Password and Confirm Password do not match"
        })
    }


    if(!emailregx.test(email)){
        return res.status(400).json({
            success: false,
            message: "Invalid email format"
        })
    }

    if(fullname.length < 3){
        return res.status(400).json({
            success: false,
            message: "Fullname must be at least 3 characters long"
        })
    }
    if(fullname.length > 30){
        return res.status(400).json({
            success: false,
            message: "Fullname must be less than 30 characters long"
        })
    }

    if(!passwordregx.test(password)){
        return res.status(400).json({
            success: false,
            message: "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        })
    }

    const hash = bcrypt.hashSync(password, 10);

    const user = new User({
        fullname,
        email,
        password: hash,
        terms
    })
    await user.save()

    let verificationToken = jwt.sign({
        _id:user.id,
        email:user.email,
        role:user.role
    }, process.env.JWT_SECRET, { expiresIn: '1h' });

    await sendVerificationEmail(user.email, verificationToken);
    console.log(verificationToken)

    

    res.status(201).json({
        success: true,
        message: "User registered successfully",
        user,
    })
}


let loginController = async (req, res) => {
    let {email, password} = req.body

    let existinguser = await User.findOne({email})

    if(!existinguser){
        return res.status(400).json({
            success: false,
            message: "User does not exist"
        })
    }

    if(!email || !password ){
       return res.status(400).json({
        success: false,
        message: "All fields are required"
       })
    }

     if(!emailregx.test(email)){
        return res.status(400).json({
            success: false,
            message: "Invalid email format"
        })
    }

    let passcompare=bcrypt.compareSync(password, existinguser.password);

    if(passcompare){
        let accesstoken = jwt.sign({
        _id:existinguser.id,
        email:existinguser.email,
        role:existinguser.role
    }, process.env.JWT_SECRET, { expiresIn: '30d' });

        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user: {
                _id: existinguser._id,
                fullname: existinguser.fullname,
                email: existinguser.email,
                role: existinguser.role
            },
            accessToken: accesstoken
        })
    }else{
        return res.status(400).json({
            success: false,
            message: "Invalid password"
        })
    }
}



let verifyEmailController = async (req, res) => {
    let {token} = req.query;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await User.findByIdAndUpdate({_id:decoded._id},{isVerified:true})
    res.status(200).json({
        
            success: true,
            message: "verified"
        
    })
}

let forgotpasswordController = async (req, res) => {
    let {email} = req.body

    let existinguser = await User.findOne({email})

    if(!existinguser){
        return res.status(400).json({
            success: false,
            message: "User does not exist"
        })
    }

     let resetpasswordtoken = jwt.sign({
        _id:existinguser.id,
        email:existinguser.email,
    }, process.env.JWT_SECRET, { expiresIn: '30m' });

    forgotpasswordEmail(email,resetpasswordtoken)

     res.status(200).json({
            success: true,
            message: "Check your email for the password reset link"
        })


}

let resetpasswordcontroller = async (req, res) => {
    let {token} = req.params;
    let {newpassword, confirmpassword} = req.body

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if(decoded){
        if(newpassword == confirmpassword){
            const hash = bcrypt.hashSync(newpassword, 10);
            await User.findByIdAndUpdate({_id:decoded._id},{password:hash})
        }else{
            return res.status(400).json({
                success: false,
                message: "Password and Confirm Password do not match"
            })
        }
    }

     res.status(200).json({
                success: true,
                message: "password changed successfully"
            })
}

//eyJfaWQiOiI2YWEyYjViYmIzZDk4YmQ0M2IwYjJlODIiLCJlbWFpbCI6InNkbW44b3JAZ21haWwuY29tIiwiaWF0IjoxNzg5NTYzOTk1LCJleHAiOjE3ODk1NjU3OTV9.QoCcb3roXWb3kwDzTLkCFiTsaH0ZppUawvjXAkMcU7M
module.exports = {registrationController, loginController, verifyEmailController, forgotpasswordController, resetpasswordcontroller}

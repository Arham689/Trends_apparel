import { asyncErrorHandler } from "../utils/asyncErrorHandler.js";
import {User} from '../models/user.models.js'
import jwt from 'jsonwebtoken'
import customError from "../utils/CustomError.js";
import bcrypt from "bcryptjs";
import util from "util"

export const singToken = (id)=>{
    return jwt.sign(
        {id} , 
        process.env.JWT_SECREAT , 
        {expiresIn :  process.env.LOGIN_EXPIRE }
    )
}

export const comparePassword = async function (pass , dbPass){
    return await bcrypt.compare(pass , dbPass)
}

export const signUp = asyncErrorHandler(async (req, res , next)=>{
    const user = await User.create(req.body)

    const token = singToken(user._id)

    res.status(200).json({
        message : "success",
        token , 
        data : user 
    })
})

export const logIn = asyncErrorHandler(async (req , res , next )=>{
    const {email , password } = req.body 

    if(!email || !password ){
        const err = new customError('All fields are require', 400)
        return next(err)
    }

    //if user is exist or not
    const user =await User.findOne({email})

    // const isMatch = await user.comparePassword(password , user.password )

    if(!user || !(await comparePassword(password , user.password )) ){
        const err = new customError('User not found ', 400)
        return next(err)
    }
    // generation token
    const token = singToken(user._id)

    res.status(200).json({
        message : 'success',
        token ,
        user
    })

})

export const protect = asyncErrorHandler(async (req , res , next )=>{
    //Token exist 
    let tempToken = req.headers.authorization
    let token
    if( tempToken && tempToken.startsWith('bearer')){
        token = tempToken.split(' ')[1]
    }

    if(!token){
        const err =new customError('You are not loged in' , 401)
        return next(err)
    }

    //validate the token
    const deCoded = await util.promisify(jwt.verify)(token , process.env.JWT_SECREAT) //verify is a async func but will not return a promis 

    //User in the db 
    const user = await User.findById(deCoded.id)
    if(!user){
        const err = new customError('User not founded ' , 401)
        return next(err)
    }

    //check for the reset password (optional)


    //access the route 
    next()
})

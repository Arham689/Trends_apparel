import mongoose, {Schema} from 'mongoose'
import bcrypt from 'bcryptjs'
const userSchema = new Schema({
    username: { 
        type: String, 
        required: true, 
        trim : true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true ,
    },
    password: { 
        type: String, 
        required: true,
    }
});

userSchema.methods.comparePassword = async function (pass , dbPass){
    return await bcrypt.compare(pass , dbPass)
}

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); 

    this.password = await bcrypt.hash(this.password, 10);

    next(); 
});

export const User = mongoose.model('User' , userSchema )
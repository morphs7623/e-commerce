const mongoose =  require('mongoose');
const bcrypt = require('bcrypt')


const userSchema = new mongoose.Schema({
    username:{type: String, required: true, unique: true},
    email:{type: String,required: true},
    password:{type: String,required: true},
    role:{type:String, enum:['user','admin'], default: 'user'}
})

userSchema.pre('save', async function(next){

    const user = this;

    if(!user.isModified('password')) return next();
    try{
        //hash password generation
        const salt = await bcrypt.genSalt(10);

        //hash password
        const hashedPassword = await bcrypt.hash(user.password, salt);

        //overwrite the plainpassword with hash password
        user.password = hashedPassword;

        next();
    }catch(err){
         return next(err);
    }
})

userSchema.methods.comparePassword = async function(candidatePassword){
    try{
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    }catch(err){
        throw err;
    }
}

const user = mongoose.model('user', userSchema)
module.exports = user;
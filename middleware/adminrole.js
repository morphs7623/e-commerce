const User = require('../models/user')

const checkAdminRole = async (userID) => {
    try{
         const user = await User.findById(userID);
         if(user.role === 'admin'){
             return true;
         }
    }catch(err){
        console.error('Error checking admin role:', err);
        return false;
    }
}

module.exports = checkAdminRole
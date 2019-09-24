import User  from '../models/User'

function UserService(user){
    this.user = user
}

UserService.prototype.register = async function(_user){
    if(_user){
        let  user = new  User(this.user)
        let alredy_user = user.find(_user.id)
        if(!alredy_user){
            user = await user.insert(_user)
        }
        else{
            throw new Error("user alredy register")
        }
        return _user   
    }
    else{
        throw Error("Invalid Data")
    }
}

module.exports = UserService
import Login  from '../models/Login'
import User from '../models/User'

function LoginService(user){
}

LoginService.prototype.login = async function(_user){
    if(_user){
        let  login = new  Login(_user)
        let user = new User(_user)
    
        let alredy_user = await user.find(_user.clientId)
        if(!alredy_user){
            console.log("log: New user")
            let reg_user = await user.insert({
                                            name:_user.name,
                                            email:_user.email,
                                            clientId: _user.clientId,
                                            url: _user.url,
                                            createdTime:new Date(),
                                            updatedTime: new Date()
                                            })
            let update_login = await login.insert({
                clientId:_user.clientId,
                accessToken:_user.accessToken,
                createdTime:new Date(),
                loginTime:new Date() })
            let login_user = await login.find(_user.clientId)
            if( login_user){
                    console.log("log: Login success")
                    return login_user 
            }
            else{
                    throw Error("Internal Error")
            } 
        }
        else{
            console.log("log: alredy user exit" )
            let login_update = await login.update({
                clientId:_user.clientId,
                accessToken:_user.accessToken,
                loginTime:new Date() })
            console.log("log: login updated", login_update)
            let login_user = await login.find(_user.clientId)
            if( login_user){
                console.log("log: Login success")
                return login_user 
            }
            else{
                throw Error("Internal Error")
            }
        }
    }
    else{
        throw Error("Invalid Data")
    }
}

module.exports = LoginService
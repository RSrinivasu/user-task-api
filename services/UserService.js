import User  from '../models/User'
import Friend from '../models/Friend'

function UserService(user){
    this.user = user
}

UserService.prototype.register = async function(_user){
    if(_user){
        let  user = new  User(this.user)
        let alredy_user = await user.find(_user.id)
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


UserService.prototype.searchByName = async function(name){
    if(name){
        let  user = new  User(this.user)
        let seachData = await user.findByName(name)
        return seachData 
    }
    return []
}


/**
 * status type codes
 * 1- request (friend request)
 * 2- pending 
 * 3- conform (accepted request)
 * 4- block 
 * 5- unfriend (relation)
 */
UserService.prototype.changeFrientReq = async function(friendReq){
    if(friendReq){
        let  friend = new Friend(this.user)
        let res ={}
        if(friendReq.status === 3 ) 
        {
            let { from, to } = friendReq
            let [res1, res2] = await Promise.all([
                await friend.update({from: from , to : to, status: 5}),
                await friend.update({from: to , to : from, status: 5})]);
            res=res1
        }
        else if(friendReq.status === 1)
        {
            let { from, to } = friendReq
            let res1 = await friend.update({from: from , to : to, status: 2} )
            let res2 = await friend.update({from: to , to : from, status: 3} )
            res=res1
        } 
        else if(friendReq.status === 4){
            let { from, to } = friendReq
            let [res1, res2] = await Promise.all([
                await friend.update({from: from , to : to, status: 4}),
                await friend.update({from: to , to : from, status: 4})]);
            res=res1
        }
        else if(friendReq.status === 5){
            let { from, to } = friendReq
            let [res1, res2] = await Promise.all([
                await friend.update({from: from , to : to, status: 1}),
                await friend.update({from: to , to : from, status: 1})]);
            res=res1
        }
        return res
    }
    else{
        throw Error("Invalid Request")
    }
}


module.exports = UserService
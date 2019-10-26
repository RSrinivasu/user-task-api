
import Friend from "../../../models/Friend"

//friend List
module.exports = async function(){
    let  friend = new  Friend(this.user)
    let friendList = await friend.get()
    return friendList 
}
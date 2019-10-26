
import Chat from "../../../models/Chat"

//friend List
module.exports = async function(to){
    let  chat = new  Chat(this.user)
    let history = await chat.get(to)
    return history 
}
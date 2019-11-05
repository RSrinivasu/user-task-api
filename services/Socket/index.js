import Login from '../../models/Login'
import Chat from '../../models/Chat'


socket.on("connection" , (client)=>{
    console.log("connected")
    client.on("receiver", async (body)=>{
        try {
            console.log("recived message", body)
            let {msg, to , token } = body
            let  login = new  Login()
            let login_user = await login.auth(token)
            if(login_user){
                console.log("login user id", login_user.clientId)
                let chatBody = {
                    msg:msg,
                    to:to,
                    from:login_user.clientId,
                    status:"pendding",
                    sendiing_time:new Date(),
                    deleverd_time:new Date()
                }
                let chat = new Chat(login_user)
                let result = await chat.insert(chatBody)
                console.log("this msg stored in db")
                socket.emit(to, login_user.clientId)
            }
            else{
                throw Error("Not Valid")
            }
        } catch (error) {
            throw error
        }
        
    })

    client.on('disconnect', () => {
        console.log("socket disconnected")
     });
})
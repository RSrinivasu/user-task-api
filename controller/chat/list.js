import  ChatService from '../../services/Chat'

export default async(req,res) =>{
    try { 
        console.log("request is frined list")
        let { user } = req
        let { to }=req.query
        console.log("chat histroy to:" ,to)
        let chatService = new ChatService(user)
        let result = await chatService.chatHistory(to)
        
        if(result)
        {
            let response ={
                success: true,
                message: "succussed get chat history",
                data:result
            }
            return res.status(200).send(response)
        }
        else{
            let response ={
                success: true,
                message: "You have no chat history",
                data:[]
            }
            return res.status(202).send(response)
        }
    } catch (error) {
        console.log(error)
        let response ={
            success: false,
            message: "failed chat history request",
        }
        return res.status(500).send(response)
    }  
}

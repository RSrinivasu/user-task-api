import  FriendsService from '../../services/Friends'


export default async(req,res) =>{
    try { 
        console.log("request is frined list")
        let { user} = req
        let userService = new FriendsService(user)
        let result = await userService.friendList()
        
        if(result)
        {
            let response ={
                success: true,
                message: "succussed friend list request",
                data:result
            }
            return res.status(200).send(response)
        }
        else{
            let response ={
                success: true,
                message: "You have a no friends",
                data:[]
            }
            return res.status(202).send(response)
        }
    } catch (error) {
        console.log(error)
        let response ={
            success: false,
            message: "failed friend list request",
        }
        return res.status(500).send(response)
    }  
}

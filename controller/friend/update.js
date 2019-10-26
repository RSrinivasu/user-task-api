import  UserService from '../../services/UserService'


export default async(req,res) =>{
    try { 
        console.log("request is frine/update")
        let { body, user } = req
        console.log(body)
        let userService = new UserService(user)
        let result = await userService.changeFrientReq(body)
        if(result)
        {
            let response ={
                success: true,
                message: "succussed update friend request",
                data:result
            }
            return res.status(200).send(response)
        }
        else{
            let response ={
                success: true,
                message: "Didn't modify friend request!",
                data:{}
            }
            return res.status(202).send(response)
        }
    } catch (error) {
        console.log(error)
        let response ={
            success: false,
            message: "failed update friend request",
        }
        return res.status(500).send(response)
    }  
}

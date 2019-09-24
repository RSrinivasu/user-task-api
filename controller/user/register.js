import UserService from '../../services/UserService'

module.exports = async (req,res) =>{
    try {    
        let user = new UserService()
        let result = await user.register(req.body)
        let response ={
            success: true,
            message: "user login success",
            data:result
        }
        return res.status(200).send(response)
    } catch (error) {
        console.log("log ::Error in register" ,error)
        let response ={
            success: false,
            message: "user login failed",
        }
        return res.status(404).send(response)
    }  
}

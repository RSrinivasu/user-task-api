import  UserService from '../../services/UserService'


export default async(req,res) =>{
    try {    
        
        let { q } = req.query
        let { user } = req
        let userService = new UserService(user)
        let result = await userService.searchByName(q)
        
        let response ={
            success: true,
            message: "serach data is available",
            data:result
        }
        return res.status(200).send(response)
    } catch (error) {
        console.log(error)
        let response ={
            success: false,
            message: "serach data is available",
        }
        return res.status(500).send(response)
    }  
}

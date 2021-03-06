import LoginService from '../../services/LoginService'


export default async(req,res) =>{
    try {    
        console.log("log request")
        let { body } = req
        if(!body.clientId){
            throw Error("Empty Request Body")
        }
        let loginService = new LoginService()
        let result = await loginService.login(body)
        let response ={
            success: true,
            message: "user login success",
            data:result
        }
        return res.status(200).send(response)
    } catch (error) {
        console.log(error)
        let response ={
            success: false,
            message: "user login failed",
        }
        return res.status(500).send(response)
    }  
}

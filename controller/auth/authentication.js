import Login  from '../../models/Login'

export default async (req, res, next) =>{
    try {
        
        let  token  = req.headers["access-token"]
        if(!token){
            let response ={
                success: false,
                message: "Access Token Required",
            }
            return res.status(502).send(response)
        }
        let  login = new  Login()
        let login_user = await login.auth(token)
        if(login_user){
            req.user = login_user
            next()
        }
        else{
            console.log("log: auth",login_user)
            let response ={
                success: false,
                message: "Access Token expaired! please login again",
            }
            return res.status(501).send(response)
        }

    }
    catch(e){
        let response ={
            success: false,
            message: "Internal Server Error",
        }
        return res.status(500).send(response)
    }
}
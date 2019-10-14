module.exports = async(token)=>{
    if(!mongo_db) throw Error("DB Connection")
    let login = mongo_db.collection("login")
    login = await login.findOne({accessToken:token})
    if(login){
        return login
    }
    else{
        return false
    }
}
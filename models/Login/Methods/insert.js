module.exports = async(_user)=>{
    let login = mongo_db.collection("login")
    let { ...ops }  = await login.insertOne({ ..._user} )
    return ops
}
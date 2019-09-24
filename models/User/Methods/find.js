module.exports = async(id)=>{
    let user = mongo_db.collection("user")
    user = await user.findOne({clientId:id})
    if(user){
        return user
    }
    else{
        return false
    }
}
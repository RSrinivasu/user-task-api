module.exports = async function(_login){
    try {
        let login = mongo_db.collection("login")
        let { modifiedCount } = await login.updateOne({ clientId : this.user.clientId },{$set:{ ..._login}})
        
        if(modifiedCount != 0){
            return modifiedCount
        }
        else{
            return modifiedCount
        }
    } catch (error) {
        throw error
    }
    
}
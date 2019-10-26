module.exports = async(friendObj)=>{
    if(!mongo_db) throw Error("DB Connection")
    let friend = mongo_db.collection("friends")
    let { from ,  to , status } = friendObj
    let { result } = await friend.updateOne({
            from: from,
            to: to
        },
        { $set:{
            status:status
            }
        },
        { upsert: true })
    console.log(result)
    if(result && ( result.nModified > 0 || result.upserted )){
        return true
    }
    else{
        return false
    }
}
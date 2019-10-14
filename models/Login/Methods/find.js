module.exports = async(id)=>{
    if(!mongo_db) throw Error("DB Connection")
    let login = mongo_db.collection("login")
    //login = await login.findOne({clientId: id})
    login = await login.aggregate([
        {
            $match: {
                clientId : id
            }
        },
        {
            $lookup:
            {
                from: "user",
                localField: "clientId",
                foreignField: "clientId",
                as:"user"
            }
        },
        {
            $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$user", 0 ] }, "$$ROOT" ] } }
        }
        ]).toArray()

    if(login && login.length > 0){
        return { ...login[0]}
    }
    else{
        return false
    }
}
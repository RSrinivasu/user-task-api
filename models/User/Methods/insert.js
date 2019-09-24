
module.exports = async(_user) =>
{
    let user = mongo_db.collection("user")
    let { ...ops } = await user.insertOne(_user)
    return ops
} 

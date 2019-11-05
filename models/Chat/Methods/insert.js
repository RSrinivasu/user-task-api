module.exports = async function(chatBody){
    if(!mongo_db) throw Error("DB Connection")
    let chat_history = mongo_db.collection("chat_history")
    console.log(this.user.clientId)
    let { ...ops }  = await chat_history.insertOne({ ...chatBody} )
    return ops
}
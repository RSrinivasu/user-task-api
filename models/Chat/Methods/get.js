module.exports = async function(to){
    if(!mongo_db) throw Error("DB Connection")
    let chat_history = mongo_db.collection("chat_history")
    console.log(this.user.clientId)
    console.log(to)
    let result = chat_history.find( {  $or:[
                                        {
                                            $and:[
                                                { to : { $eq: this.user.clientId}},
                                                { from: { $eq: to }}
                                           ]
                                         },
                                         {
                                            $and:[
                                                { from : { $eq: this.user.clientId}},
                                                { to: { $eq: to }}
                                            ]
                                         }
                                    ]}).toArray()
    if(result){
        result = result
    }

    if(result){
        return result
    }
    else{
        return false
    }
}
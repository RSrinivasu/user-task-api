module.exports = async function(name){
    if(!mongo_db) throw Error("DB Connection")
    let user = mongo_db.collection("user")
    // let users = await user.find({ name:{'$regex': name , $options: 'i'},
    //                               clientId:{ $ne: this.user.clientId}}).toArray()

    let users = await user.aggregate([
        {
            $match: {
                name:{'$regex': name , $options: 'i'},
                clientId:{ $ne: this.user.clientId}
            }
        },
        {
            $project: {
                __v: 0,
                _id: 0,
                createdTime:0,
                updatedTime:0
            }
        },
        {
            $lookup:
            {
                from: "friends",
                // localField: "clientId",
                // foreignField: "from",
                let: { clientId: "$clientId" },
                pipeline: [
                    { $match: {
                        //from:{ $eq:"$$clientId"}
                        $expr: { $and: [
                                    { $eq: [ "$to", "$$clientId" ] },
                                    { $eq: [ "$from", this.user.clientId ] },
                                    //{ $eq: [ "t", "t" ] }
                        ] }
                    } }
                ],
                as:"friends",
            }
        },
        {
            $project: {
                __v: 0,
                "friends.__v": 0,
            }
        },
        {
            $lookup:
            {
                
                from: 'friend_status',
                localField: 'friends.status',
                foreignField: 'code',
                as: 'status'   
            }
        },
        {
            $project: {
                __v: 0,
                "status.__v": 0,
                "status._id": 0,
            }
        },
        ]).toArray()
    if(users){
        return users
    }
    else{
        return false
    }
}
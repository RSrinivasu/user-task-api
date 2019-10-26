module.exports = async function(){
    if(!mongo_db) throw Error("DB Connection")
    let friends = mongo_db.collection("friends")

    console.log(this.user.clientId)
    let result = await friends.aggregate([
        {

            $match: {
                //from:{ $eq:"$$clientId"}
                $expr: { 
                        $and:[ 
                        {
                            $eq:["$status" , 5]
                        },
                        {
                            $eq:[ "$to", this.user.clientId ]     
                        }]
                }
            },
        }, 
        {
            $lookup:{
                from: 'user',
                let: { to: "$to" , from:"$from"},
                pipeline: [
                    { $match: {
                        //from:{ $eq:"$$clientId"}
                        $expr: { 
                            $and:[ 
                                {
                                    $ne:["$clientId" , this.user.clientId]
                                },
                                {
                                $or: [
                                        { $eq: [ "$clientId", "$$to" ] },
                                        { $eq: [ "$clientId", "$$from" ] },
                                    ] 
                                }]
                        }
                    } }
                ],
                as: 'user'
            }
            
        },
        {
            $project: {
                "user.__v": 0,
                "user._id": 0,
                "user.createdTime":0,
                "user.updatedTime":0
            }
        }
        ]).toArray()

    if(result){
        result = result.map(obj => obj.user[0])
    }

    if(result){
        return result
    }
    else{
        return false
    }
}
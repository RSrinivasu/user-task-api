import fs from 'fs'


class FriendsService {
    constructor(user) {
        this.user = user;
    }
}


fs.readdirSync(__dirname + "/Methods/").forEach(function(file) {
    if (file != 'index.js') {
      let filename = file.replace('.js', '')
      //console.log(filename)
      FriendsService.prototype[filename] = require(__dirname + "/Methods/" + filename)
    }
  })

module.exports = FriendsService
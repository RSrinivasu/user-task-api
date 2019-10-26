import fs from 'fs'


class ChatService {
    constructor(user) {
        this.user = user;
    }
}


fs.readdirSync(__dirname + "/Methods/").forEach(function(file) {
    if (file != 'index.js') {
      let filename = file.replace('.js', '')
      //console.log(filename)
      ChatService.prototype[filename] = require(__dirname + "/Methods/" + filename)
    }
  })

module.exports = ChatService
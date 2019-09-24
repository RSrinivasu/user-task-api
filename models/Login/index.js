import fs from 'fs'

function Login(_user){
    this.user = _user
}

fs.readdirSync(__dirname + "/Methods/").forEach(function(file) {
    if (file != 'index.js') {
      let filename = file.replace('.js', '')
      //console.log(filename)
      Login.prototype[filename] = require(__dirname + "/Methods/" + filename)
    }
  })

//User.prototype.register =  require('./Methods/register')

module.exports = Login
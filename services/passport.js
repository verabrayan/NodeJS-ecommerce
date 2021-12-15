const passport = require('../libs/passport')

const Auth = require("../services/auth");
const authService = new Auth();

class provider {
    authGoogle() {
        return passport.authenticate("google", {
          scope: ['email', 'profile']
        })
      }
    
      authGoogleCallback(req,res) {
        return new Promise((resolve,reject)=>{
          passport.authenticate("google",async (err,data)=>{
            if (err){
              return reject({success:false})
            }
            const {emails,displayName,provider} = data.profile
            const user = await authService.registro(emails[0].value,"123pollo",displayName,provider)
            return resolve({user,success:true})
          })(req,res)
        })
        
      }
}
module.exports = provider
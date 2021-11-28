const usuario= require('../schemas/usuario')
const jwt = require('jsonwebtoken')

//const products = new usuario()

class usuarios {
    async getUsuarios(){
        const usuarios = await usuario.find() 
        return usuarios || []
    }

    async getUser(email){
        const usuarios = await usuario.findOne({email}).exec()

        return usuarios
    }

   async createUsuario(data){
        //const newUser = new usuario(data)
        //await newUser.save()
        const newUser = await usuario.create(data)
        return newUser|| {}
    }

    async updateUsuario(id,data){
        const user = await usuario.findByIdAndUpdate(id,data)
        return user || {}
    }
    async deletUsuario(id){
        const Id = await usuario.findByIdAndDelete(id)
        return Id || {}
    }

/*     async login(email,password,name){
       const Usuario = await usuario.findOne({email}).exec() 
       if (Usuario){
           if(password === Usuario.password){
               const token = jwt.sign({email,name},"12345",{
                   expiresIn:"1d"
               })
               return {Usuario,token}
           }
       }
       return {"message":"Credenciales incorrectas"}
       
        
    } */
} 
module.exports = usuarios
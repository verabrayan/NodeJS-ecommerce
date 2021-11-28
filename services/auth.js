const jwt = require("jsonwebtoken")
const config = require("../config")

const Usuarios = require("./usuarios")

class Auth{
    usuarios = new Usuarios()
    async login(email,password){
        const usuario = await this.usuarios.getUser(email)
        if(usuario){
            if(password===usuario.password){
                const token = jwt.sign({email,rol:usuario.rol},config.jwt_password,{
                    expiresIn:"1d"
                })
                return {token,usuario,success:true}
            }
        }

        return {"message":"Credenciales incorrectas",success:false}
    }
    async registro(email,password,name){
        const usuario = await this.usuarios.createUsuario({email,password,name})
        
        if(usuario){
            return {"message":"Registro exitoso",success:true,usuario}
        }

        return {"message":"Credenciales incorrectas",success:false}
    }

    async cambiarRol(id,rol){
        const usuario = await this.usuarios.updateUsuario(id,{rol})
        if(usuario){
            return {"message":"Rol actualizado",success:true,usuario}
        }

        return {"message":"Ocurrio un error",success:false}
    }
}

module.exports = Auth
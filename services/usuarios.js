const {UsuarioModel, usuarioSchemaJoi} = require("../schemas/usuario");
const jwt = require("jsonwebtoken");

//const products = new UsuarioModel()

class usuarios {
  async getUsuarios() {
    const usuarios = await UsuarioModel.find();
    return usuarios || [];
  }

  async getUser(email) {
    const usuarios = await UsuarioModel.findOne({ email }).exec();

    return usuarios;
  }

  async validateUser(data){
    const validacion = usuarioSchemaJoi.validate(data)
    //console.log(validacion.error)
    if(validacion.error){
        return {data:validacion.value,success:false,message:validacion.error.details[0].message}
    }

    const usuarioExiste = await this.getUser(data.email)
    if(usuarioExiste){
        return {data:validacion.value,success:false,message:"El correo ya esta en uso"}
    }
    

    return {data:validacion.value,success:true,message:"Datos validados correctamente"}
}

  async createUsuario(data) {
    //const newUser = new UsuarioModel(data)
    //await newUser.save()
    const newUser = await UsuarioModel.create(data);
    return newUser || {};
  }

  async updateUsuario(id, data) {
    const user = await UsuarioModel.findByIdAndUpdate(id, data);
    return user || {};
  }
  async deletUsuario(id) {
    const Id = await UsuarioModel.findByIdAndDelete(id);
    return Id || {};
  }

  /*     async login(email,password,name){
       const Usuario = await UsuarioModel.findOne({email}).exec() 
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
module.exports = usuarios;

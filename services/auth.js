const jwt = require("jsonwebtoken");
const config = require("../config/index");
const bcrypt = require("bcrypt");
const Usuarios = require("./usuarios");
const passport = require('../libs/passport')

class Auth {
  usuarios = new Usuarios();

  async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }


  async login(email, password) {
    const usuario = await this.usuarios.getUser(email);
    if (usuario) {
      const passwordMatch = await bcrypt.compare(password, usuario.password);
      if (passwordMatch) {
        const token = jwt.sign(
          { email, rol: usuario.rol, id: usuario.id },
          config.jwt_password,
          {
            expiresIn: "1h",
          }
        );
        return { token, usuario, success: true };
      }
    }

    return { message: "Credenciales incorrectas", success: false };
  }

  async registro(email, password_init, name, provider) {
    const validacion = await this.usuarios.validateUser({email,password:password_init,name,provider:"email"})
    if(validacion.success){
      const password = await this.hashPassword(password_init)
      const usuario = await this.usuarios.createUsuario({...validacion.data,password})

      return usuario
    }
    return {success:false,...validacion}
  }


  async cambiarRol(id, rol) {
    const usuario = await this.usuarios.updateUsuario(id, { rol });
    if (usuario) {
      return { message: "Rol actualizado", success: true, usuario };
    }

    return { message: "Ocurrio un error", success: false };
  }

  authGoogle(){
    return passport.authenticate("google", {
    scope:['email','profile']})
  }

  authGoogleCallback(){
    return passport.authenticate("google",{
    successRedirect:'/productos',
    failureRedirect:'/productos'})
  }
}

module.exports = Auth;

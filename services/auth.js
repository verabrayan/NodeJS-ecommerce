const jwt = require("jsonwebtoken");
const config = require("../config/index");
const bcrypt = require("bcrypt");
const Usuarios = require("./usuarios");

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
          { email, rol: usuario.rol },
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

  async registro(email, password_init, name) {
    const emailUser = await this.usuarios.getUser(email)
    if (emailUser){
      return { message: "El usuario ya existe"}
    }else{
      let password = await this.hashPassword(password_init);
      const usuario = await this.usuarios.createUsuario({email,password,name});
  
      if (usuario) {
        return { message: "Registro exitoso", success: true, usuario };
      }
    }

    return { message: "Credenciales incorrectas", success: false };
  }

  async cambiarRol(id, rol) {
    const usuario = await this.usuarios.updateUsuario(id, { rol });
    if (usuario) {
      return { message: "Rol actualizado", success: true, usuario };
    }

    return { message: "Ocurrio un error", success: false };
  }
}

module.exports = Auth;

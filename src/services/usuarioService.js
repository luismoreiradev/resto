import backEndCall from "../utils/backEndCall";
import bcrypt from 'bcryptjs';


var Singleton = (function(){
    const PATH_BASE = "/api/usuario/";
    //const SALT = bcrypt.genSaltSync(10);
    var SALT = "$2a$10$3a5euUsiSuZKOzccsGPede";


    
    let callerCredentials = {frontEndToken: ""};
    
    function Singleton(){
    }
    
    Singleton.prototype.setCallerCredentials = function(credentials) {
        if (credentials) {
            callerCredentials = {...credentials};
            if (callerCredentials.frontEndToken == null) {
                callerCredentials.frontEndToken = "";
            }
        } else {
            callerCredentials = {frontEndToken: ""};
        }
    };
    
    Singleton.prototype.login = async function(userId, pass) {
        //console.log("salt", SALT);
        const hashedPassword = bcrypt.hashSync(pass, SALT);
        //console.log("hashedPassword", hashedPassword);
        return backEndCall.post(PATH_BASE + "login", {idUsuario: userId, claveHasheada: hashedPassword}).then(result => {
            if (result.status !== "OK") {
                if (result.mensaje) {
                    throw result.mensaje;
                } else {
                    throw new Error("Error interno");
                }
            } else {
                result.claveHasheada = undefined;
                console.log("login result", result.status);
                return result;
            }
        });
    };

    Singleton.prototype.checkPath = async function() {
        return backEndCall.post(PATH_BASE + "checkPath", {}).then(result => {
            
            //console.log("checkPath result", result)
            if (result.status !== "OK") {
                throw result;
            } else {
                return true;
            }
        });
    };

    
    Singleton.prototype.enviarRecuperoClave = async function(email) {
        return backEndCall.post(PATH_BASE + "enviarRecuperoClave", {correo: email})
        .then(result => {
            if (result.status !== "OK") {
                if (result.mensaje) {
                    throw result.mensaje;
                } else {
                    throw new Error("Error interno");
                }
            } else {
                return result;
            }
        });
    };

    Singleton.prototype.enviarValidarCodigoDeUnicaVez = async function(codigoUnicaVez, _id) {
        return backEndCall.post(PATH_BASE + "enviarValidarCodigoDeUnicaVez", {codigoUnicaVez: codigoUnicaVez, _id: _id})
        .then(result => {
            if (result.status !== "OK") {
                if (result.mensaje) {
                    throw result.mensaje;
                } else {
                    throw new Error("Error interno");
                }
            } else {
                return result;
            }
        });
    };

    Singleton.prototype.enviarClaveNueva = async function(codigoBlanqueo, nuevaClave, _id) {
        const nuevaClaveHasheada = bcrypt.hashSync(nuevaClave, SALT);
        return backEndCall.post(PATH_BASE + "enviarClaveNueva", {codigoBlanqueo: codigoBlanqueo, nuevaClave: nuevaClaveHasheada, _id: _id})
        .then(result => {
            if (result.status !== "OK") {
                if (result.mensaje) {
                    throw result.mensaje;
                } else {
                    throw new Error("Error interno");
                }
            } else {
                return result;
            }
        });
    };



    Singleton.prototype.create = async function(user) {
        return backEndCall.post(PATH_BASE, user, {frontEndToken: callerCredentials.frontEndToken});
    };

    Singleton.prototype.getById = async function(id) {
        return backEndCall.get(PATH_BASE + id, {frontEndToken: callerCredentials.frontEndToken});
    };

    Singleton.prototype.update = async function(user) {
        return backEndCall.put(PATH_BASE + user._id, user, {frontEndToken: callerCredentials.frontEndToken});
    };

    Singleton.prototype.delete = async function(id) {
        return backEndCall.delete(PATH_BASE + id, {frontEndToken: callerCredentials.frontEndToken});
    };


    var instance;
  
    return function() {
      if (!instance) {
        instance = new Singleton();
      }
      return instance;
    };
  })();
  
  
var usuarioService = new Singleton();
export default usuarioService;
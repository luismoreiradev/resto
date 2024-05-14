
var Singleton = (function(){    
    let contexto = {
        inicio: `${new Date()}`,
        ultimo:  `${new Date()}`,
        fePath: "", 
        feToken: ""
    };
    
    let usuario = {roles: ["guest"]};
    let sesionObj = {status: "init", contexto: contexto, usuario: usuario};

    function Singleton(){
    }
    

    //Aquí los métodos públicos
    Singleton.prototype.toObject = function() {
        return sesionObj;
    };

    Singleton.prototype.esUsuarioLogueado = function() {
        return (sesionObj.status === "login");
    };

    Singleton.prototype.logout = function() {
        let result = false;
        if (sesionObj.status === "login"){
            result = true;
        }
        sesionObj.status = "init";
        
        sesionObj.usuario = {roles: ["guest"]};
        console.log("sesion se cerró la sesión");
        return result;
    };

    var instance;
  
    return function() {
      if (!instance) {
        instance = new Singleton();
      }
      return instance;
    };
})();  
  
var sesion = new Singleton();

export default sesion;

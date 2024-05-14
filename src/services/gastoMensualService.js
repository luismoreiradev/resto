import backEndCall from "../utils/backEndCall";


var Singleton = (function(){
    const PATH_BASE = "/api/gm/";

    function Singleton(){
    }

    Singleton.prototype.getMeses = async function() {
        return backEndCall.get(PATH_BASE + 'meses');
    };

    //Devuelve todos los "conceptos" existentes sin repetición
    Singleton.prototype.getGastos = async function() {
        return backEndCall.get(PATH_BASE + 'gastos');
    };

    Singleton.prototype.getByMes = async function(mes) {
        return backEndCall.get(PATH_BASE + 'mes/' + mes);
    };

    Singleton.prototype.createMesNuevo = async function() {
        return backEndCall.post(PATH_BASE + 'mesNuevo');
    };

    Singleton.prototype.create = async function(gastoMensual) {
        return backEndCall.post(PATH_BASE, gastoMensual);
    };

    Singleton.prototype.getById = async function(id) {
        return backEndCall.get(PATH_BASE + id);
    };

    Singleton.prototype.update = async function(gastoMensual) {
        return backEndCall.put(PATH_BASE + gastoMensual._id, gastoMensual);
    };

    Singleton.prototype.deleteMes = async function(mes) {
        return backEndCall.delete(PATH_BASE + "mes/" + mes );
    };

    Singleton.prototype.delete = async function(id) {
        return backEndCall.delete(PATH_BASE + id);
    };


    var instance;
  
    return function() {
      if (!instance) {
        instance = new Singleton();
      }
      return instance;
    };
  })();
  
  
var gastoMensualService = new Singleton();



export default gastoMensualService;
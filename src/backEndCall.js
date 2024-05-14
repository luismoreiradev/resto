/*
import { wait } from '@testing-library/user-event/dist/utils';
import axios, {AxiosError} from 'axios';

let BASE_URL;


var Singleton = (function(){
    let token;
    let validoHasta;
    let semaforoToken = false;

    function Singleton(){
    }

    const getAxiosConfigCall = async () => {
        if (typeof token === 'undefined' || validoHasta < new Date()) {

            while(semaforoToken) {
                await wait(100);
            }

            semaforoToken = true;
            if (typeof token === 'undefined' || validoHasta < new Date()) {
                await obtenerTokenNuevo((user)=> {
                    token = user.token;
                    validoHasta = new Date(user.until);
                });
            } else {
                console.log("token obtenido por otro");
            }
            semaforoToken = false;
        }
        return { headers: {"token" : "bearer " + token} };
    };

    // Object can have instance methods as usually.
    Singleton.prototype.get = async function(path) {
        return axios.get(buildURL(path), await getAxiosConfigCall()).then(resultHandle).catch(errHandle);
    };

    Singleton.prototype.post = async function(path, data) {
        return axios.post(buildURL(path), data, await  getAxiosConfigCall()).then(resultHandle).catch(errHandle);
    };

    Singleton.prototype.put = async function(path, data) {
        return axios.put(buildURL(path), data, await getAxiosConfigCall()).then(resultHandle).catch(errHandle);
    };

    Singleton.prototype.delete = async function(path) {
        return axios.delete(buildURL(path), await getAxiosConfigCall()).then(resultHandle).catch(errHandle);
    };
    var instance;
  
    return function() {
      if (!instance) {
        instance = new Singleton();
      }
      return instance;
    };
  })();
  
  
var backEndCall = new Singleton();

export default backEndCall;

async function obtenerTokenNuevo(setTokenCallBack) {
    await axios.get(BASE_URL + "/api/token/yo@aca.com.ar/hola").then(result => {
      //console.log("Se obtuvo token", result.data);
      setTokenCallBack(result.data.user);
    }).catch(err => {
      console.log("Error obteniendo token:", err.code, err.message, err);
      throw err;
    });
  }
  
const resultHandle = (result) => {
    if (result.status === 200 || (result.status > 200 && result.status < 299)) {
        return result.data;
    } else {
        throw new AxiosError(result.statusText + " data: " + result.data, result.status);
    }
};

const errHandle = (err) => {
    throw new Error("(" + err.code + ") " + (err.message && "\"" + err.message + "\"" ));
};

const buildURL = (path) => {
    //Habría que agregar chequeos? También UUENCODEO?

    if (! path.startsWith("/")) {
        path = "/" + path
    }
    return getBaseUrl() + path;
}

const getBaseUrl = () => {
    //Hay que armarlo usando la configuración del sitio

    if (! BASE_URL) {
        BASE_URL = "https://www.amigazo.com.ar:8000";
    }

    return BASE_URL;
}
*/
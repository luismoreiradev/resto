import { wait } from '@testing-library/user-event/dist/utils';
import axios, {AxiosError} from 'axios';
import sesion from "../sesion.js";
import myEncriptacion from './myEncriptacion.js';


let BASE_URL;
const margenMilisegundos = 1000;

var Singleton = (function(){
    let publicKey;
    let token;
    let validoHasta;
    let semaforoToken = false;
    
    function Singleton(){
    }
    
    const getAxiosConfigCall = async (headers) => {
        const fePath = sesion.toObject().contexto.fePath;
        const feToken = sesion.toObject().contexto.feToken;
        
        if (token == null || validoHasta < new Date().getTime()) {

            while(semaforoToken) {
                await wait(100);
            }

            semaforoToken = true;
            if (publicKey == null) {
                //Primero hay que obtener la public key del servidor
                await obtenerPublicKey((publicKeyRecived)=> {
                    publicKey = publicKeyRecived;
                    myEncriptacion.setPublicKey(publicKey);
                }, fePath, feToken);
            }
            
            if (token == null || validoHasta < new Date().getTime()) {
                await obtenerTokenNuevo((userBE, publicKeyVencida)=> {
                    if (publicKeyVencida) {
                        publicKey = undefined;
                        //console.log("token NO obtenido publicKeyVencida");
                    } else {
                        //console.log("token nuevo obtenido", userBE);
                        token = userBE.token;
                        validoHasta = new Date(userBE.until).getTime() - margenMilisegundos;
                    }
                }, fePath, feToken);
                if (publicKey == null) {
                    //Se venció la public key (o cambio por restart del back end)
                    //Hay que comenzar todo de nuevo
                    semaforoToken = false;
                    await getAxiosConfigCall(headers);
                }
            } else {
                console.log("token obtenido por otro");
            }

            semaforoToken = false;
        }

        //console.log("backendcall feToken", feToken);
        //console.log("backendcall token", token);
        const headersToAdd = {"token" : "bearer " + token, fepath: fePath, fetoken: feToken};

        if (headers) {
            return { headers: {...headers, ...headersToAdd} };
        } else {
            return { headers: {...headersToAdd} };
        }
    };

    //Aquí los métodos públicos
    Singleton.prototype.get = async function(path, headers) {
        return axios.get(buildURL(path), await getAxiosConfigCall(headers)).then(resultHandle).catch(errHandle);
    };

    Singleton.prototype.post = async function(path, data, headers) {
        return axios.post(buildURL(path), data, await getAxiosConfigCall(headers)).then(resultHandle).catch(errHandle);
    };

    Singleton.prototype.put = async function(path, data, headers) {
        return axios.put(buildURL(path), data, await getAxiosConfigCall(headers)).then(resultHandle).catch(errHandle);
    };

    Singleton.prototype.delete = async function(path, headers) {
        return axios.delete(buildURL(path), await getAxiosConfigCall(headers)).then(resultHandle).catch(errHandle);
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


async function obtenerPublicKey(setPublicKeyCallBack, fePath, feToken) {
    //Se obtiene la public key con la que se va a encriptar los datos del llamado de obtención de token
    const headersToAdd = {fepath: fePath, fetoken: feToken};
    //console.log("obtenerPublicKey headersToAdd", headersToAdd);
    await axios.post(BASE_URL + "/api/token/", {requestPublicKey: "MuchaSarasaDefinida"}, { headers: {...headersToAdd} })
    .then(result => {
        if (result.headers.fetoken) {
            sesion.toObject().contexto.feToken = result.headers.fetoken;
        }
      
        //console.log("Se obtuvo la public key", result.data);
        setPublicKeyCallBack(result.data);
    }).catch(err => {
      console.log("Error obteniendo token back end:", err.code, err.message, err);
      throw err;
    });
  }

async function obtenerTokenNuevo(setTokenCallBack, fePath, feToken) {
    const headersToAdd = {fepath: fePath, fetoken: feToken};
    //console.log("obtenerTokenNuevo headersToAdd", headersToAdd);

    //Fundamental poner la información entre comillas (NO funciona mandar el objeto json directamente)
    await myEncriptacion.encriptar('{"correo": "yo@aca.com.ar", "clave": "hola" }')
    .then(async requestEncriptada => {
        //console.log("requestEncriptada", requestEncriptada);
        //Una vez que se tiene el request encriptado, se hace el llamado al back end pidiendo el token nuevo
        await axios.post(BASE_URL + "/api/token/", {request:requestEncriptada}, { headers: {...headersToAdd} })
        .then(result => {
            //console.log("Public key headers", result.headers);
            if (result.headers.publickeyvencida) {
                console.log("Public key vencida");
                setTokenCallBack(undefined, true);
                return;
            }
            if (result.headers.fetoken) {
                sesion.toObject().contexto.feToken = result.headers.fetoken;
            }
            //console.log("Se obtuvo token", result.data);
            setTokenCallBack(result.data.user, false);
        }).catch(err => {
          console.log("Error obteniendo token back end:", err.code, err.message, err);
          throw err;
        });
    });

  }
  
const resultHandle = (result) => {
    if (result.status === 200 || (result.status > 200 && result.status < 299)) {
        if (result.data.status === 'errors') {
            throw result.data.message ? result.data.message : result.data;
        }
        if (result.headers.fetoken) {
            //console.log("fetoken renovado", result.headers.fetoken);
            sesion.toObject().contexto.feToken = result.headers.fetoken;
        }
        return result.data;
    } else {
        throw new AxiosError(result.statusText + " data: " + result.data, result.status);
    }
};

const errHandle = (err) => {
    if (err instanceof AxiosError) {
        throw new Error("(" + err.code + ") " + (err.message && "\"" + err.message + "\"" ));
    } else {
        throw err;
    }
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
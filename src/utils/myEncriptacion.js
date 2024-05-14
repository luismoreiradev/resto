
import forge , { jsbn, util } from 'node-forge';

var Singleton = (function(){
    forge.options.usePureJavaScript = true;
    const rsa = forge.pki.rsa;

    let publicKey;//is a node.js Buffer or Uint8Array

    function Singleton(){
     }
    
    Singleton.prototype.setPublicKey = (publicKeyParam) => {
        publicKey = forge.pki.publicKeyFromPem(publicKeyParam);
    }

    Singleton.prototype.encriptar = async function(data) {
        // encrypt data with a public key using RSAES-OAEP/SHA-256/MGF1-SHA-1
        // compatible with Java's RSA/ECB/OAEPWithSHA-256AndMGF1Padding
        var encrypted = publicKey.encrypt(data, 'RSA-OAEP', {
            md: forge.md.sha256.create(),
            mgf1: {
            md: forge.md.sha1.create()
            }
        });

        return util.encode64(encrypted);
    };

    var instance;
  
    return function() {
      if (!instance) {
        instance = new Singleton();
      }
      return instance;
    };
  })();
  
  
var myEncriptacion = new Singleton();

export default myEncriptacion;

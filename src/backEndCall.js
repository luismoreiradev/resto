import axios from 'axios';
const BASE_URL = "https://amigazo.com.ar:8000";

let axiosConfigCall = { headers: {
    token: "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzNCwiZW1haWwiOiJ5b0BhY2EuY29tLmFyIiwidW50aWwiOjE3MTM4NzY2MzcwMzMsImFtYmllbnRlIjoiREVTQSIsImlhdCI6MTcxMzc5MDIzN30.IwHIuJF0VGfEZ-9DGRvTwCNkvBCnuV236n-9yo5-SRg"
}
};

var Singleton = (function(){
    function Singleton(){
    }
  
    // Object can have instance methods as usually.
    Singleton.prototype.get = function(path) {
        return axios.get(`${BASE_URL}${path}`, axiosConfigCall);
    };

    Singleton.prototype.post = function(path, data) {
        return axios.post(`${BASE_URL}${path}`, data, axiosConfigCall);
    };

    Singleton.prototype.put = function(path, data) {
        return axios.put(`${BASE_URL}${path}`, data, axiosConfigCall);
    };

    Singleton.prototype.delete = function(path, data) {
        return axios.delete(`${BASE_URL}${path}`, axiosConfigCall);
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

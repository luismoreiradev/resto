import React, { useState, useEffect, useRef } from "react";
import backEndCall from "../utils/backEndCall";

function ItemConValor({ onItemChange }) {
  const [formData, setFormData] = useState({ nombre: "", moneda: "", monto: "" });
  const [listadoMonedas, setListadoMonedas] = useState([]);
  const shouldLogRef = useRef(false); // Ref to track whether to log or not

  useEffect(() => {
    fetchMonedas();
  }, []);

  useEffect(() => {
    // Check if shouldLogRef is true and log formData
    if (shouldLogRef.current) {
      console.log(formData);
      onItemChange(formData);
      shouldLogRef.current = false; // Reset shouldLogRef after logging
    }
  }, [formData, onItemChange]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: name === 'fecha' ? new Date(value) : value // Convert 'fecha' to Date object
    }));
    shouldLogRef.current = true; // Set shouldLogRef to true after state update
  };

  const fetchMonedas = () => {
    backEndCall.get('/api/moneda')
      .then(response => {
        setListadoMonedas(response); // Set listadoMonedas to the response from the backend
      })
      .catch(error => {
        console.error("Error fetching currencies:", error);
      });
  };

  return (
    <div className="bg-amber-500">
      <form>
        <div className="w-1/2 mr-4">
          <label htmlFor="nombre" className="block mb-2">
            Nombre:
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500"
          />
        </div>
        <div className="w-1/2 mr-4">
          <label htmlFor="moneda" className="block mb-2">
            Moneda:
          </label>
          <select
            id="moneda"
            name="moneda"
            value={formData.moneda}
            onChange={handleChange}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500"
          >
            <option value="">Seleccione una moneda</option>
            {listadoMonedas.map((moneda, index) => (
              <option key={index} value={moneda.nombre}>
                {moneda.nombre} ({moneda.symbol})
              </option>
            ))}
          </select>
        </div>
        <div className="w-1/2 mr-4">
          <label htmlFor="monto" className="block mb-2">
            Monto:
          </label>
          <input
            type="number"
            id="monto"
            name="monto"
            value={formData.monto}
            onChange={handleChange}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500"
          />
        </div>
      </form>
    </div>
  );
}

export default ItemConValor;

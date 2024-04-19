import React, { useEffect, useState } from 'react';

import backEndCall from '../backEndCall';

function TodosLosGastos() {
  // State to store the fetched data
  const [datos, setDatos] = useState([]);
  const [consulta,setConsulta]=useState({
    mes: "",
    year: ""
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setConsulta({ ...consulta, [name]: value });
  };

  // Fetch data from the API when the component mounts
  /*
  useEffect(() => {
    backEndCall.get("/gm/gastos")
      .then(function (response) {
        // Update the state with the fetched data
        setDatos(response.data);
      })
      .catch(function (error) {
        // Log any errors that occur during the fetch
        console.error("Error fetching data:", error);
      });
  }, []); // Empty dependency array ensures this effect runs only once on mount
*/

  function handleSubmit(e) {
    e.preventDefault(); // Prevent form submission from refreshing the page
    // Make the API call with the selected month and year
    backEndCall.get(`/api/gm/mes/${consulta.year}-${consulta.mes}-01`)
    .then(function (response) {
      // Update the state with the fetched data
      setDatos(response.data);
      console.log(response.data);
    })
    .catch(function (error) {
      // Log any errors that occur during the fetch
      console.error("Error fetching data:", error);
    });


    backEndCall.get(`/api/gm/mes/${consulta.year}-${consulta.mes}-01`)
      .then(function (response) {
        // Update the state with the fetched data
        setDatos(response.data);
      })
      .catch(function (error) {
        // Log any errors that occur during the fetch
        console.error("Error fetching data:", error);
      });
  }
  return (
    <div className="bg-amber-500 p-8">
    <h1 className="text-center text-9xl">Todos los gastos</h1>
    <p className="p-10 font-montserrat">
      esta inonono ojon pagina esta vacia todavia pero ya la voy a llenar
    </p>
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="">
        <div className="flex items-end  mb-4">
          <div className="w-1/2 mr-4">
            <label htmlFor="mes" className="block mb-2">
              Mes:
            </label>
            <select
              id="mes"
              name="mes"
              value={consulta.mes}
              onChange={handleInputChange}
              className="block w-full mt-1"
            >
              <option value="">Seleccione mes</option>
              <option value="01">Enero</option>
              <option value="02">Febrero</option>
              <option value="03">Marzo</option>
              <option value="04">Abril</option>
              <option value="05">Mayo</option>
              <option value="06">Junio</option>
              <option value="07">Julio</option>
              <option value="08">Agosto</option>
              <option value="09">Septiembre</option>
              <option value="10">Octubre</option>
              <option value="11">Noviembre</option>
              <option value="12">Diciembre</option>
            </select>
          </div>
          <div className="w-1/2">
            <label htmlFor="year" className="block mb-2">
              Año:
            </label>
            <input
              type="number"
              id="year"
              name="year"
              value={consulta.year}
              onChange={handleInputChange}
              className="block w-full mt-1"
            />
          </div>
          <button
            type="submit"
            className="  block ml-4 px-1 py-1 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 whitespace-nowrap"
          >
            Submit Month
          </button>
        </div>
      </form>
    </div>
    {/* Render the fetched data here */}
    <ul>
      {/*datos.map((receta, index) => (
        <li key={index}>{receta}</li>
      ))*/}
    </ul>
  </div>
  );
}

export default TodosLosGastos;
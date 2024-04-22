import React, { useEffect, useState } from 'react';
import backEndCall from '../backEndCall';
import Formulario from "../components/Formulario";

function TodosLosGastos() {
  const [datos, setDatos] = useState([]);
  const [consulta, setConsulta] = useState("");
  const [meses, setMeses] = useState([]);

  useEffect(() => {
    fetchMeses(); // Fetch meses data when component mounts
  }, []);

  const fetchMeses = () => {
    backEndCall.get('/api/gm/meses')
      .then(response => {
        // Extract the month and year information and set the meses state
        const mesesArray = response.data.map(dateString => {
          const [year, month] = dateString.slice(0, 7).split('-');
          return `${getMonthName(parseInt(month))}/${year}`;
        });
        setMeses(mesesArray);
      })
      .catch(error => {
        console.error("Error fetching meses data:", error);
      });
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setConsulta(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Split the selected value to extract month and year
    const [month, year] = consulta.split('/');
    backEndCall.get(`/api/gm/mes/${year}-${getMonthNumber(month)}-01`)
      .then(response => {
        setDatos(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  };

  // Helper function to get month name from number
  const getMonthName = (monthNumber) => {
    const months = [
      'January', 'February', 'March', 'April',
      'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'
    ];
    return months[monthNumber - 1];
  };

  // Helper function to get month number from name
  const getMonthNumber = (monthName) => {
    const months = {
      'January': '01', 'February': '02', 'March': '03', 'April': '04',
      'May': '05', 'June': '06', 'July': '07', 'August': '08',
      'September': '09', 'October': '10', 'November': '11', 'December': '12'
    };
    return months[monthName];
  };

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
                Seleccione mes y año:
              </label>
              <select
                id="mes"
                value={consulta}
                onChange={handleInputChange}
                className="block w-full mt-1"
              >
                <option value="">Seleccione mes y año</option>
                {meses.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="  block ml-4 px-1 py-1 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 whitespace-nowrap"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      {datos.map((data, index) => (
        <Formulario key={index} data={data}  />
      ))}
    </div>
  );
}

export default TodosLosGastos;

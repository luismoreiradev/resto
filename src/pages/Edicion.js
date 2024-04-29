import React, { useEffect, useState } from "react";
import backEndCall from "../backEndCall";
import Formulario from "../components/Formulario";

function Edicion() {
  const [consulta, setConsulta] = useState("");
  const [datos, setDatos] = useState([]);
  const [meses, setMeses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMeses();
  }, []);

  const fetchMeses = () => {
    backEndCall
      .get("/api/gm/meses")
      .then((result) => {
        const mesesArray = result.map((dateString) => {
          const [year, month] = dateString.slice(0, 7).split("-");
          return `${getMonthName(parseInt(month))}/${year}`;
        });
        setMeses(mesesArray);
      })
      .catch((error) => {
        setError(error);
        console.error("Error fetching meses data:", error);
      });
  };

  const getMonthName = (monthNumber) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[monthNumber - 1];
  };

  const getMonthNumber = (monthName) => {
    const months = {
      January: "01",
      February: "02",
      March: "03",
      April: "04",
      May: "05",
      June: "06",
      July: "07",
      August: "08",
      September: "09",
      October: "10",
      November: "11",
      December: "12",
    };
    return months[monthName];
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setConsulta(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const [month, year] = consulta.split("/");
    backEndCall
      .get(`/api/gm/mes/${year}-${getMonthNumber(month)}-01`)
      .then((response) => {
        setDatos(response);
        console.log("Updated datos after submit:", response);
      })
      .catch((error) => {
        setError(error);
        console.error("Error fetching data:", error);
      });
  };

  const handleDelete = (id) => {
    backEndCall
      .delete(`/api/gm/${id}`)
      .then(() => {
        fetchDataAfterDelete();
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  const fetchDataAfterDelete = () => {
    const [month, year] = consulta.split("/");
    backEndCall
      .get(`/api/gm/mes/${year}-${getMonthNumber(month)}-01`)
      .then((response) => {
        setDatos(response);
        console.log("Updated datos after delete:", response);
      })
      .catch((error) => {
        setError(error);
        console.error("Error fetching data after delete:", error);
      });
  };

  return (
    <div className="bg-amber-500 p-8">
      <h1 className="text-center text-9xl">Todos los gastos</h1>
      <p className="p-10 font-montserrat">
        Esta página está vacía todavía, pero ya la voy a llenar.
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
                  <option key={index} value={option}>
                    {option}
                  </option>
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

      {datos.map((data) => (
        <Formulario
          key={data._id} // Ensure each component has a unique key based on the item's ID
          data={data}
          onDelete={() => handleDelete(data._id)} // Pass the delete handler to Formulario
          isEditing={true}
          />
      ))}
    </div>
  );
}

export default Edicion;

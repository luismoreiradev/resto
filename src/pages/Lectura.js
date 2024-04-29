// Lectura.js
import React, { useEffect, useState } from "react";
import backEndCall from "../backEndCall";
import Formulario from "../components/Formulario";
import { useNavigate } from "react-router-dom";

function Lectura() {
  const [consulta, setConsulta] = useState("");
  const [datos, setDatos] = useState([]);
  const [meses, setMeses] = useState([]);
  const [error, setError] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // New state to track if it's editing or creating
  const navigate = useNavigate();

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

  const handleEdit = (item) => {
    setEditItem(item);
    setIsEditing(true); // Set editing mode to true
    setShowForm(true); // Toggle the showForm state
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

  const handleSaveChanges = (updatedData) => {
    backEndCall
      .put(`/api/gm/${updatedData._id}`, updatedData)
      .then(() => {
        setShowForm(false);
        fetchData();
      })
      .catch((error) => {
        console.error("Error updating item:", error);
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

  const fetchData = () => {
    const [month, year] = consulta.split("/");
    backEndCall
      .get(`/api/gm/mes/${year}-${getMonthNumber(month)}-01`)
      .then((response) => {
        setDatos(response);
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

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Moneda</th>
            <th>Monto</th>
            <th>Periodo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((item) => (
            <tr key={item._id}>
              <td>{item.nombre}</td>
              <td>{item.moneda}</td>
              <td>{item.monto}</td>
              <td>{item.esBimestral ? "Bimestral" : "Mensual"}</td>
              <td className="flex gap-4">
                <button
                  className="flex-1 px-4 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 focus:outline-none focus:bg-gray-300"
                  onClick={() => handleEdit(item)}
                >
                  Editar
                </button>
                <button
                  className="flex-1 px-4 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 focus:outline-none focus:bg-gray-300"
                  onClick={() => handleDelete(item._id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && editItem && (
        <div className="form-container">
          <Formulario
            data={editItem}
            esconder={true}
            isEditing={isEditing} // Pass the isEditing prop to the Formulario component
            fetchDataAfterDelete={fetchDataAfterDelete}
            onSaveChanges={handleSaveChanges}
          />
        </div>
      )}
    </div>
  );
}

export default Lectura;

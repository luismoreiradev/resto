import React, { useState } from "react";
import { useNavigate } from "react-router";
import backEndCall from "../backEndCall";

function useBimestralCheckbox(initialState) {
  const [esBimestral, setEsBimestral] = useState(initialState);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    if (name === "bimestral" && checked) {
      setEsBimestral(true);
    } else if (name === "mensual" && checked) {
      setEsBimestral(false);
    }
  };

  return [esBimestral, handleCheckboxChange];
}

function Formulario({ data, esconder, fetchDataAfterDelete, onSaveChanges }) {
  const [mostrar, setMostrar] = useState(!esconder);
  const [form, setForm] = useState({
    mes: data && data.mes ? data.mes : "",
    nombre: data && data.nombre ? data.nombre : "",
    moneda: data && data.moneda ? data.moneda : "",
    monto: data && data.monto ? data.monto : "",
    esBimestral:
      data && data.esBimestral !== undefined ? data.esBimestral : true,
  });

  const [id, setId] = useState(null);

  const months = [
    { value: "01", label: "Enero" },
    { value: "02", label: "Febrero" },
    { value: "03", label: "Marzo" },
    { value: "04", label: "Abril" },
    { value: "05", label: "Mayo" },
    { value: "06", label: "Junio" },
    { value: "07", label: "Julio" },
    { value: "08", label: "Agosto" },
    { value: "09", label: "Septiembre" },
    { value: "10", label: "Octubre" },
    { value: "11", label: "Noviembre" },
    { value: "12", label: "Diciembre" },
  ];

  const [esBimestral, handleCheckboxChange] = useBimestralCheckbox(
    data && data.esBimestral !== undefined ? data.esBimestral : true
  );

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: newValue,
      esBimestral: name === "bimestral" ? newValue : prevForm.esBimestral,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { ...form, esBimestral: esBimestral };
    backEndCall
      .post("/api/gm/", formData)
      .then((response) => {
        console.log("dato guardado:", response);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    console.log("Form submitted:", formData);
  };

  function editar(id, formData) {
    const updatedFormData = { ...formData, monto: parseInt(formData.monto) };
    backEndCall
      .put(`/api/gm/${id}`, updatedFormData)
      .then((response) => {
        console.log("dato guardado:", response);
        onSaveChanges(updatedFormData); // Trigger onSaveChanges callback
        setMostrar(false); // Hide the form after editing
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function eliminar(id) {
    backEndCall
      .delete(`/api/gm/${id}`)
      .then((response) => {
        console.log("dato eliminado:", response);
        fetchDataAfterDelete(id); // Pass the deleted item id
        setMostrar(false); // Hide the form after deleting
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <div className="bg-amber-500 flex flex-col items-center">
      <div className="min-h-screen bg-amber-500 py-6 flex flex-col justify-center sm:py-12">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            {mostrar && (
              <div>
                <label htmlFor="mes" className="mr-2 mb-2">
                  Seleccione un mes:
                </label>
                <select
                  id="mes"
                  name="mes"
                  value={form.mes}
                  onChange={handleInputChange}
                >
                  <option value="">-- Seleccione un mes--</option>
                  {months.map((month) => {
                    const value = `2024-${month.value}`;
                    return (
                      <option key={month.value} value={value}>
                        {month.label}
                      </option>
                    );
                  })}
                </select>
              </div>
            )}

            <div className="flex items-center">
              <div className="w-1/2 mr-4">
                <label htmlFor="nombre" className="block mb-2">
                  Nombre:
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                />
              </div>
              <div className="w-1/2">
                <label htmlFor="moneda" className="block mb-2">
                  Moneda:
                </label>
                <select
                  id="moneda"
                  name="moneda"
                  value={form.moneda}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                >
                  <option value="">Select Option</option>
                  <option value="dolar">Dolares</option>
                  <option value="peso">Pesos</option>
                  <option value="euro">Euros</option>
                  <option value="dolarMEP">Dolar MEP</option>
                </select>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-1/2 mr-4">
                <label htmlFor="monto" className="block mb-2">
                  Precio:
                </label>
                <input
                  type="number"
                  id="monto"
                  name="monto"
                  value={form.monto}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                />
              </div>
              <div className="w-1/2">
                <label className="block mb-2">Periodo:</label>
                <input
                  type="checkbox"
                  id="bimestral"
                  name="bimestral"
                  checked={esBimestral}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="bimestral">Bimestral</label>

                <input
                  type="checkbox"
                  id="mensual"
                  name="mensual"
                  checked={!esBimestral}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="mensual">Mensual</label>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-1/3">{/* Include other form fields here */}</div>
              <div className="w-1/3">
                <button
                  type="submit"
                  className="w-full px-4 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 focus:outline-none focus:bg-gray-300"
                >
                  Guardar
                </button>
              </div>
              <div className="w-1/3">
                <button
                  onClick={() => editar(data._id, form)}
                  className="w-full px-4 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 focus:outline-none focus:bg-gray-300"
                >
                  Editar
                </button>
              </div>
            </div>
          </form>
          <div className="flex items-center justify-center mt-4">
            <button
              onClick={() => eliminar(data._id)}
              className="px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:bg-red-600"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Formulario;


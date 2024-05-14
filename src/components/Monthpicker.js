import React, { useState, useEffect, useRef } from "react";
import backEndCall from "../utils/backEndCall";

function Monthpicker({ onMesChange }) {
  const [formData, setFormData] = useState({ mes: "" });
  const [meses, setMeses] = useState([]);
  const shouldLogRef = useRef(false); // Ref to track whether to log or not

  useEffect(() => {
    fetchMeses();
  }, []);

  useEffect(() => {
    // Check if shouldLogRef is true and log formData
    if (shouldLogRef.current) {
      console.log(formData);
      onMesChange(formData);
      shouldLogRef.current = false; // Reset shouldLogRef after logging
    }
  }, [formData, onMesChange]);

  const fetchMeses = () => {
    backEndCall.get('/api/gm/meses')
      .then(result => {
        const mesesArray = result.map(dateString => {
          const [year, month] = dateString.slice(0, 7).split('-');
          return `${getMonthName(parseInt(month))}/${year}`;
        });
        setMeses(mesesArray);
      })
      .catch(error => {
        console.error("Error fetching meses data:", error);
      });
  };

  const getMonthName = (monthNumber) => {
    const months = [
      'January', 'February', 'March', 'April',
      'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'
    ];
    return months[monthNumber - 1];
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    shouldLogRef.current = true; // Set shouldLogRef to true after state update
  };

  return (
    <div className="bg-amber-500">
      <p className="p-10 font-montserrat">Monthpicker</p>
      <form>
        <label htmlFor="mes" className="mr-2 mb-2">
          Seleccione un mes:
        </label>
        <select
          id="mes"
          name="mes"
          value={formData.mes}
          onChange={handleChange}
          className="block w-full mt-1"
        >
          <option value="">Seleccione mes y año</option>
          {meses.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
      </form>
    </div>
  );
}

export default Monthpicker;

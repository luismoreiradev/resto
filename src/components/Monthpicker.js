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
      'enero', 'febrero', 'marzo', 'abril',
    'mayo', 'junio', 'julio', 'agosto',
    'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];
    return months[monthNumber - 1];
  };

  const getMonthNumber = (monthName) => {
    const months = {
      'enero': '01', 'febrero': '02', 'marzo': '03', 'abril': '04',
      'mayo': '05', 'junio': '06', 'julio': '07', 'agosto': '08',
      'septiembre': '09', 'octubre': '10', 'noviembre': '11', 'diciembre': '12'
    };
    return months[monthName];
  };

  const handleChange = (e) => {
    const { value } = e.target;
    // Parse the selected value into "mm-yyyy" format
    const [month, year] = value.split('/');
    const formattedMonth = `${getMonthNumber(month)}-${year}`;
    
    // Update the formData state with the formatted month
    setFormData({ mes: formattedMonth });
    
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

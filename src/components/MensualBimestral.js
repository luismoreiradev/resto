import React, { useState } from "react";

function MensualBimestral({ handleMensualBimestral }) {
  const [esBimestral, setEsBimestral] = useState(true); // Default to true for 'Bimestral'

  const handleFrequencyChange = (event) => {
    const { checked, name } = event.target;
    if (name === "bimestral") {
      setEsBimestral(checked);
      handleMensualBimestral(checked); // Pass the selected value to the parent component
    } else if (name === "mensual") {
      setEsBimestral(!checked); // Invert value for 'Mensual'
      handleMensualBimestral(!checked); // Pass the selected value to the parent component
    }
  };

  return (
    <div className="bg-amber-500">
      <form>
       
        <input
          type="checkbox"
          id="bimestral"
          name="bimestral"
          checked={esBimestral}
          onChange={handleFrequencyChange}
        />
        <label htmlFor="bimestral">Bimestral</label><br />
        <input
          type="checkbox"
          id="mensual"
          name="mensual"
          checked={!esBimestral} // Inverse checked value for 'Mensual'
          onChange={handleFrequencyChange}
        />
        <label htmlFor="mensual">Mensual</label><br />
      </form>
    </div>
  );
}

export default MensualBimestral;

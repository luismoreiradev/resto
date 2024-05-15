import React, { useEffect, useState } from "react";
import backEndCall from "../utils/backEndCall";
import Monthpicker from "../components/Monthpicker";
import ItemConValor from "../components/ItemConPValor";
import MensualBimestral from "../components/MensualBimestral";

function Gastos() {

  const [formMes, setMes] = useState({});
  const [formItem, setItem] = useState({});
  const [esBimestral, setEsBimestral] = useState(true); // Default to true for 'Bimestral'

  const combinedFormData = { ...formMes, ...formItem, esBimestral }; // Include esBimestral directly in combinedFormData
  
/*
  useEffect(() => {
    console.log(formMes); // Log the updated state value in useEffect
  }, [formMes]); // Run this effect whenever formMes changes
  
*/

  const handleMesChange = (data) => {
    setMes(data);    
  };

  const handleItemChange = (data)=>{
    setItem(data)
  }

  const handleMensualBimestral = (data) =>{
    setEsBimestral(data); // Update esBimestral directly
  }

  function mostrar() {   
    console.log("combinedFormData:", combinedFormData);
  }

  return (
    <div className="bg-amber-500">
      <h1 className="text-center text-9xl ">Gastos page</h1>
      <Monthpicker onMesChange={handleMesChange}/>
      <ItemConValor onItemChange={handleItemChange}/>
      <MensualBimestral handleMensualBimestral={handleMensualBimestral}/>
      <button onClick={mostrar} className="block ml-4 px-1 py-1 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 whitespace-nowrap">mostrar</button>
    </div>
  );
}

export default Gastos;

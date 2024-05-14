import React, { useEffect, useState } from "react";
import backEndCall from "../utils/backEndCall";
import Monthpicker from "../components/Monthpicker";
import ItemConValor from "../components/ItemConPValor";

function Gastos() {

  const [formMes, setMes] = useState({});
  const [formItem, setItem]= useState({})
  const combinedFormData = { ...formMes, ...formItem };
 
  
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

  function mostrar() {
   
    console.log("combinedFormData:", combinedFormData);
  }

  return (
    <div className="bg-amber-500">
      <h1 className="text-center text-9xl ">Gastos page</h1>
      <Monthpicker onMesChange={handleMesChange}/>
      <ItemConValor onItemChange={handleItemChange}/>
      <button onClick={mostrar}>mostrra</button>
    </div>
  );
}

export default Gastos;

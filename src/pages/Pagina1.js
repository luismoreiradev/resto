import React, { useState } from "react";
import { useNavigate } from "react-router";
import backEndCall from "../backEndCall";

function Pagina1() {


  return (
    <div className="bg-amber-500 flex flex-col items-center">
      <div className="min-h-screen bg-amber-500 py-6 flex flex-col justify-center sm:py-12">
        <h1 className="text-center text-9xl mb-8">Pagina1</h1>
        <p className="p-10 font-montserrat mb-8">
          esta pagina esta vacia todavia pero ya la voy a llenar
        </p>
      
        
      </div>
    </div>
  );
}

export default Pagina1;

import React, { useState , useEffect} from "react";
import { useNavigate } from "react-router";
import backEndCall from "../utils/backEndCall";
import Formulario from "../components/Formulario";


function Pagina2() {

  const [selectedMonth, setSelectedMonth] = useState('');

  // Array of month options
  const months = [
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' }
  ];

  // Handle change when a month is selected
  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
    
  };

 

  
    return ( 
        <div className="bg-amber-500">
    
        <Formulario/>
        </div>
     );
}

export default Pagina2;
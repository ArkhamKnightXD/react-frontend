import './App.css';
import React, { useState, useEffect } from 'react';

import axios from "axios";
import TableComponent from './TableComponent'

//si lo definimos como clase debemos de extender de componente y aplicar la funcion render
function App () {

  const [users, setUsers] = useState([]);

  //Tener cuidado a la hora de importar useEffect, pues lo estaba importandod e otro lugar y me daba error
  useEffect(() => {

    // los axios y lo relacionado con la carga de datos desde un api va dentro de un useEffect para su correcto funcionamiento
    axios.get(`http://localhost:88/api/all`).then(res => {

      setUsers(res.data);
    });
  }, []);

  const handleChange = event =>{

  }


    return (
        <div className="App">

            <TableComponent users={users}/>

        </div>
    );
}

export default App;

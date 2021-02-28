import './App.css';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import TableComponent from './TableComponent'
import {Button, Container} from "reactstrap";
import ModalComponent from "./ModalComponent";


//si lo definimos como clase debemos de extender de componente y aplicar la funcion render
function App () {

  const [users, setUsers] = useState([]);

  //Especifico un objeto con campos vacios para mi user initial
  const [actualUser, setActualUser] = useState({id:0, name:"", lastName:""});
  const [modalState, setModalState] = useState(false);

  //Con estos estados definire si mi modal hara un create o un update
  const [createSubmit, setCreateSubmit] = useState(false);

  //Tener cuidado a la hora de importar useEffect, pues lo estaba importandod e otro lugar y me daba error
  useEffect(() => {

    // varios elementos axios y lo relacionado con la carga de datos desde un api va dentro de un useEffect para su correcto funcionamiento
      //este axios en especifico va aqui pues este carga todos los usuarios en siempre que se recargue la pagina
      //por esta razon lo queremos en un useEffe
    axios.get(`http://localhost:88/api/all`).then(res => {

      setUsers(res.data);
    });

  }, []);



  //funcion encargada de abrir modal
  const openModal = (actualUser) =>{

      setActualUser(actualUser);
      setModalState(true);
  }

  const closeModal = () =>{

      setModalState(false);
  }

    return (
        <div className="App">

          <Container>
              {/*Aqui indico qe cuando se haga click al boton se ejecute la funcion openModal  */}
              <Button color="success" onClick={openModal}>Insertar Nuevo Usuario</Button>

            <TableComponent users={users} openModal={openModal} setUsers={setUsers} setCreateSubmit={setCreateSubmit} />

            {/*Mediante los props le mando al componente la funcion para cerrar el modal y tambie el valor del modal de si es true o false*/}
            <ModalComponent setUsers={setUsers} actualUser={actualUser} setActualUser={setActualUser} modalState={modalState} closeModal={closeModal} createSubmit={createSubmit} />

          </Container>

        </div>
    );
}

export default App;

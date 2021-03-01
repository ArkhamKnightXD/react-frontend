import './App.css';
import React, { useState, useEffect } from 'react';
import TableComponent from './TableComponent'
import {Button, Container} from "reactstrap";
import ModalComponent from "./ModalComponent";
import EditModalComponent from "./EditModalComponent";
import {getAllUsers, getUserById} from "./UserService";


//si lo definimos como clase debemos de extender de componente y aplicar la funcion render
function App () {

  const [users, setUsers] = useState([]);

  //Especifico un objeto con campos vacios para mi user initial
  const [actualUser, setActualUser] = useState({id:0, name:"", lastName:""});
  const [actualUserToEdit, setActualUserToEdit] = useState({id:0, name:"", lastName:""});
  const [actualId, setActualId] = useState(0);
  const [modalState, setModalState] = useState(false);
  const [modalEditState, setModalEditState] = useState(false);


  //Tener cuidado a la hora de importar useEffect, pues lo estaba importandod e otro lugar y me daba error
  useEffect(() => {

    // varios elementos axios y en especial lo relacionado con la carga de todos los datos desde un api va dentro de un useEffect para su correcto funcionamiento
      //este axios en especifico va aqui pues este carga todos los usuarios en siempre que se recargue la pagina
      //por esta razon lo queremos en un useEffe

      //llamos las funciones que contienen los axios en el UserService
      getAllUsers(setUsers);

      getUserById(actualId,setActualUserToEdit);


      //Tengo que ejecutar el useEffect (renderizar la pagina) cada vez que el actualId cambia para que ejecute
      //el metodo getUserById de nuevo y cambie el usuario que manda
  }, [actualId]);



  //funcion encargada de abrir modal
  const openModal = (actualUser) =>{

      setActualUser(actualUser);
      setModalState(true);
  }

  const closeModal = () =>{

      setModalState(false);
  }


    //funcion encargada de abrir modal
    const openEditModal = (actualId) =>{

        setActualId(actualId);
        setModalEditState(true);
    }

    const closeEditModal = () =>{

        setModalEditState(false);
    }

    return (
        <div className="App">

          <Container>
              {/*Aqui indico qe cuando se haga click al boton se ejecute la funcion openModal  */}
              <Button color="success" onClick={openModal}>Insertar Nuevo Usuario</Button>

            <TableComponent users={users} openEditModal={openEditModal} setUsers={setUsers} />

            {/*Mediante los props le mando al componente la funcion para cerrar el modal y tambie el valor del modal de si es true o false*/}
            <ModalComponent setUsers={setUsers} actualUser={actualUser} setActualUser={setActualUser} modalState={modalState} closeModal={closeModal} />

            <EditModalComponent setUsers={setUsers} actualUser={actualUserToEdit} actualId={actualId} setActualUser={setActualUserToEdit} modalState={modalEditState} closeEditModal={closeEditModal} />

          </Container>

        </div>
    );
}

export default App;

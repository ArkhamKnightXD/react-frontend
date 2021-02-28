import React, {useState} from "react"
// para este proyecto se instalara bootstrap y reactrap mediante npm install, ya que estas dependencias son las necesaria para utiliza bootstrap
//imports de bootstrap y reactstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table, Button} from "reactstrap";
import DeleteModalComponent from "./DeleteModalComponent";

function TableComponent(props) {

    const [deleteModalState, setDeleteModalState] = useState(false);
    //valor para guardar el id actual
    const [actualId, setActualId] = useState(0);


    const openDeleteModal = (userId) =>{

        //Cada vez que se abra el modal el actual id se actualizara al del usuario correspondiente
        setActualId(userId);

        //esto tambien falla
       // props.setCreateSubmit(true);

        setDeleteModalState(true);
    }

    const closeDeleteModal = () =>{

        setDeleteModalState(false);
    }

    return(

        <div className="container">
            <Table>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Acciones</th>
                </tr>
                </thead>

                <tbody>

                {props.users.map((user) =>(

                    //de esta forma pongo el key cuando se trata de iterar una tabla
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.lastName}</td>
                        {/*Hay veces que una funcion onclick que este siplemente entre {} dara error por que se ejecutara siempre sin nosotros haber dado click
                        para solucionar esto utilizamos arros function para que solo se active cuando hagamos click
                        Este problema sucede mayormente cuando la funcion utiliza parentesis al final ya que debemos de agregar un parametro*/}
                        <td> <Button color="primary" onClick={()=> props.openModal(user)}>Editar</Button>  <Button onClick={()=> openDeleteModal(user.id)} color="danger">Eliminar</Button></td>
                    </tr>

                ))}

                </tbody>

                <tfoot>

                </tfoot>
            </Table>
            <DeleteModalComponent deleteModalState={deleteModalState} closeDeleteModal={closeDeleteModal} actualId={actualId} setUsers={props.setUsers}/>
        </div>



    );
}

export default TableComponent;
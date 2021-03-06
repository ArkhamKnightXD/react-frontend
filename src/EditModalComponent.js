import React, {useState, useEffect} from "react";
import {Button, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {getAllUsers, updateUser} from "./UserService";


function EditModalComponent(props) {

    //Objeto donde almacenare mis datos del modal para mandarlos al api
    const form = {
        id: props.actualUser.id,
        name: props.actualUser.name,
        lastName: props.actualUser.name
    };

    //Especifico los estados que almacenaran los cambios de mi formulario
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");

    useEffect(() => {

        //problema mayor resuelto, como deseo que los campos tenga los campos del user enviado y que se actualicen en tiempo real
        //debo de entrar los estados que se encargaran de los campos dentro del useEffect para que cuando el user cambie
        //estos tambien cambien de valores y que tengan los del usuario correspondiente el useEffect es importantisimo
        setLastName(props.actualUser.lastName);
        setName(props.actualUser.name);

        //Tengo que ejecutar el useEffect (renderizar la pagina) cada vez que el actualUser cambia
    }, [props.actualUser]);


    //Aqui guardo los cambios introducidos en los inputs
    const handleChangeName = (event) => {

        form.name = event.target.value;

        setName(form.name);
    }

    const handleChangeLastName = (event) => {

        form.lastName =  event.target.value;
        setLastName(form.lastName);
    }

    async function handleEditSubmit() {

        form.name = name;
        form.lastName = lastName;

        await updateUser(form);

        getAllUsers(props.setUsers);

        props.closeEditModal();
    }


    return(
        <div className="container">

                {/*Aqui debo de utilizar el metodo isOpen y debo mandarle un boolean para indicar si el modal esta abierto o cerrado*/}
                <Modal isOpen={props.modalState}>
                    <ModalHeader>
                        <div>
                            <h3>Insertar Registro</h3>
                        </div>
                    </ModalHeader>

                    <ModalBody>
                        <FormGroup>
                            <label>Id</label>
                            <input className="form-control" value={form.id} readOnly type="text"/>
                        </FormGroup>
                        <label>Nombre</label>
                        <input className="form-control" name="name" type="text" value={name} onChange={handleChangeName}/>
                        <FormGroup>
                            <label>Apellido</label>
                            <input className="form-control" name="lastName" type="text" value={lastName} onChange={handleChangeLastName}/>
                        </FormGroup>

                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary" onClick={handleEditSubmit}>Guardar</Button>
                        <Button color="danger" onClick={props.closeEditModal}> cancelar</Button>
                    </ModalFooter>

                </Modal>
        </div>
    );
}

export default EditModalComponent;
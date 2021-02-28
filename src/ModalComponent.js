import React from "react";
import {Button, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import axios from "axios";


function ModalComponent(props) {

    //Objeto donde almacenare mis datos del modal para mandarlos al api
    const form = {
        name: '',
        lastName: ''
    };

    //Aqui guardo los cambios introducidos en los inputs
    const handleChangeName = (event) => {

        form.name = event.target.value;

        //falla pero debo ver como trabajar con estados
        // props.setActualUser(form.name);

        console.log("name:", form.name);
    }

    const handleChangeLastName = (event) => {

        form.lastName = event.target.value;

        // props.setActualUser(form.lastName);

        console.log("Lastname", form.lastName);
    }

    //Aqui descontruyo el handleChange y el form  de useForm en los elementos que tengo en el parentesis
   // const { handleChange, form } = useForm(defaultFormState);

    //Esta funcion es la que se encargara de enviar los datos del formularios guardados en model para el backend
    //el async indica que esta funcion se ejecutara en 2do plano y los cambios se veran inmediato
    //esto es necesario a la hora de actualizar un dato del backend y que se vea reflejado de inmediato en el frontend
    async function handleSubmit(createSubmit) {

        console.log("createSubmit:", createSubmit);

        //si pongo las peticiones axios dentro de una funcion entonces no es necesario el useEffect
        //lo que si es correcto es definir los axios en el componente que se utilizaran no mandarlos por props
        //forma basica de un post cuando no deseo recibir nada

        //si es un create ejecutara save y sino ejecutara update
        if (!createSubmit){

            await axios.post(`http://localhost:88/api/save`, form);
        }
        else
            await axios.put(`http://localhost:88/api/update`, form);


        //hago otro get para que se actualize en tiempo real la insercion que hice
        axios.get(`http://localhost:88/api/all`).then(res => {

            props.setUsers(res.data);
        });

        //finalmente cierro el modal

        props.closeModal();
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
                            <input className="form-control" value={props.actualUser.id} readOnly type="text"/>
                        </FormGroup>
                        <label>Nombre</label>
                        <input className="form-control" name="name" type="text" value={props.actualUser.name} onChange={handleChangeName}/>
                        <FormGroup>
                            <label>Apellido</label>
                            <input className="form-control" name="lastName" type="text" value={props.actualUser.lastName} onChange={handleChangeLastName}/>
                        </FormGroup>

                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary" onClick={() => handleSubmit(props.createSubmit)}>Guardar</Button>
                        <Button color="danger" onClick={props.closeModal}> cancelar</Button>
                    </ModalFooter>

                </Modal>
        </div>
    );
}

export default ModalComponent;
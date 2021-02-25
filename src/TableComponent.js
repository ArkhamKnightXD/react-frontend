import React from "react"
// para este proyecto se instalara bootstrap y reactrap mediante npm install, ya que estas dependencias son las necesaria para utiliza bootstrap
//imports de bootstrap y reactstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table, Button, Container, Modal, ModalBody, ModalHeader, ModalFooter, FormGroup} from "reactstrap";

function TableComponent(props) {

    return(

        <Container>
            <Button color="success">Insertar Nuevo Usuario</Button>
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
                            <td> <Button color="primary">Editar</Button>  <Button color="danger">Eliminar</Button></td>
                        </tr>
                    ))}

                </tbody>

                <tfoot>

                </tfoot>
        </Table>

        <Modal>
            <ModalHeader>
                <div>
                    <h3>Insertar Registro</h3>
                </div>
            </ModalHeader>

            <ModalBody>
                <FormGroup>
                    <label>Id</label>
                    <input className="form-control" readOnly type="text"/>
                </FormGroup>
                    <label>Nombre</label>
                    <input className="form-control" name="name" type="text"/>
                <FormGroup>
                    <label>Apellido</label>
                    <input className="form-control" name="lastName" type="text"/>
                </FormGroup>

            </ModalBody>

            <ModalFooter>
                <Button color="primary">Guardar</Button>
                <Button color="danger"> cancelar</Button>
            </ModalFooter>
        </Modal>

    </Container>
    );
}

export default TableComponent;
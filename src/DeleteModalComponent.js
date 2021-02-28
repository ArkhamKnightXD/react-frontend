import {Button, Modal, ModalBody, ModalFooter} from "reactstrap";
import axios from "axios";


function DeleteModalComponent(props) {

    const deleteUserById = async (userId) => {

        await axios.delete(`http://localhost:88/api//delete/${userId}`);


        axios.get(`http://localhost:88/api/all`).then(res => {

            props.setUsers(res.data);
        });

        props.closeDeleteModal();
    }

    return(
        <div className="container">
            <Modal isOpen={props.deleteModalState}>
                <ModalBody>
                    Estas seguro que desea eliminar el usuario
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={()=> deleteUserById(props.actualId)}>Eliminar</Button>
                    <Button color="secondary" onClick={props.closeDeleteModal}>Cancelar</Button>
                </ModalFooter>
            </Modal>

        </div>
    );
}

export default DeleteModalComponent;
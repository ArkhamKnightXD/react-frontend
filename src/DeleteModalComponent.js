import {Button, Modal, ModalBody, ModalFooter} from "reactstrap";
import {deleteUserById, getAllUsers} from "./UserService";


function DeleteModalComponent(props) {

    const deleteUser = async (userId) => {

        await deleteUserById(userId);

        getAllUsers(props.setUsers);

        props.closeDeleteModal();
    }

    return(
        <div className="container">
            <Modal isOpen={props.deleteModalState}>
                <ModalBody>
                    Estas seguro que desea eliminar el usuario
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={()=> deleteUser(props.actualId)}>Eliminar</Button>
                    <Button color="secondary" onClick={props.closeDeleteModal}>Cancelar</Button>
                </ModalFooter>
            </Modal>

        </div>
    );
}

export default DeleteModalComponent;
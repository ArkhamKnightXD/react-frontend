//Este servicio se encargara de las conexiones con el api para hacer mi app mas modular
import axios from "axios";


//Estas son las formas simple de retornar datos de la api usando axios mediante funciones
//esto puede mejorarse con redux y promises, pero para este ejemplo lo dejare asi

//Recibo el setUser y le mando los datos del api
export const getAllUsers = (setUsers) => {

    axios.get(`http://localhost:88/api/all`).then(res => {

        setUsers(res.data);
    });
};

//recibo el form con los datos del usuario
export const createUser = async (form) =>{

    //forma basica de un post cuando no deseo recibir nada
    await axios.post(`http://localhost:88/api/save`, form);
};

export const getUserById = (actualId, setActualUserToEdit) =>{

    axios.get(`http://localhost:88/api/get/${actualId}`).then(res => {

        setActualUserToEdit(res.data);
    });
};

export const updateUser = async (form) =>{

    await axios.put(`http://localhost:88/api/update`, form);
}

export const deleteUserById = async (userId) =>{

    await axios.delete(`http://localhost:88/api//delete/${userId}`);

};
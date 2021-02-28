//Este servicio se encargara de las conexiones con el api para hacer mi app mas modular
//Para hacer esto de la forma mas eficiente trabajare con redux , luego comentare cosas importantes de redux
//probar redux los promises fallan

import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";

//me falla esta config investigare como trabajar con redux para mejorar estos metodos

export const getAllUsers = async () => {
    return new Promise(resolve => {

        axios.get(`http://localhost:88/api/all`).then(res => {
            resolve(res.data);
        });
    });
};


//metodo utilizando redux
export const getAllUsers2 = createAsyncThunk('userService/users', async () => {

    const response = await axios.get(`http://localhost:88/api/all`);
    const data = await response.data;
    return { data };
});
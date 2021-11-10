
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { LOGIN } from '../../redux/types';

import './Login.css';


const Login = (props) => {

    const history = useNavigate();

    //Hooks
    const [msgError, setmsgError] = useState("");
    const [credentials, setCredentials] = useState({ correo: '', clave: '' });

    //Handler o manejador
    const manejadorInputs = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const logeame = async () => {

        let body = {
            correo: credentials.correo,
            clave: credentials.clave
        };

        try {

            let res = await axios.post("https://aramossanchez-videoclub-api.herokuapp.com/usuarios/login", body);
            setmsgError(`Hola de nuevo ${res.data.usuario.nombre}....`);

            //MÉTODO NO VÁLIDO PRE-REDUX
            //localStorage.setItem("datosLogin", JSON.stringify(res.data.usuario));
            //////////////////////////////////////////////

            //Guardamos en REDUX
            let datos = res.data;
            
            props.dispatch({type:LOGIN,payload:datos});

            /*setTimeout(() => {
                history("/profile");
            }, 4000);*/
        } catch (error) {
            setmsgError(error);

        }

    }


    return (

        <div className="designLogin">
            {/*<pre>{JSON.stringify(credentials, null,2)}</pre>*/}
            <input type='email' name='correo' title='correo' onChange={manejadorInputs} lenght='30' />
            <input type='password' name='clave' title='clave' onChange={manejadorInputs} lenght='30' />
            <div className="sendButton" onClick={() => logeame()}>Login</div>
            <div className="error">{msgError}</div>
        </div>
    )
};

export default connect()(Login);
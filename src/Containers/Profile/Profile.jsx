
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import './Profile.css';
import { LOGOUT } from '../../redux/types';

const Profile = (props) => {


    //Declaramos el hook que va a bindearse (atarse) a los inputs, en este
    //hook se van a ir guardando aquellas modificaciones que hagamos sobre los input,
    //cuando vayamos a enviar los datos ya modificados a la base de datos y a RDX lo sacaremos
    //de este hook.

    //Originalmente le damos como valor props.credentials.usuario porque queremos que se nutra de Redux,
    //aunque la primera vez que se monta el componente el valor de token es '' y de usuario tambien es ''
    const [userData, setUserData] = useState(props.credentials.usuario);

    const manejaInputs = (e) => {
        //Función encargada de bindear el hook con los inputs.
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }

    const logOut = () => {
        //limpio redux...por lo tanto deslogueo
        //esta función ejecuta el reducer en modalidad LOGOUT para borrar los datos 
        //de credenciales de RDX y así la el componente Profile al notar que no hay nada de credenciales
        //en RDX se recarga de nuevo mostrando el return que corresponde a que no hay nadie logueado

        props.dispatch({ type: LOGOUT });

    }

    useEffect(() => {
        
        //Parte clave del código... en este punto, este useEffect está
        //exclusivamente atento a props.credentials (redux), por lo que si alguien
        //se loguea y se rellenan los datos de credenciales en redux, este useEffect está atento
        //y setea (mediante setUserData) los datos en el hook. por lo tanto, este seteo es el que rellena
        //los inputs con los datos de usuario al actualizarse redux cuando alguien hace click en el 
        //boton de login
        setUserData(props.credentials.usuario);

    }, [props.credentials]);


    if (props.credentials?.token !== '') {
        return (
            <div className="designProfile">
                <pre>{JSON.stringify(userData, null, 2)}</pre>
                {/*La joya del código de este ejemplo sería
                userData?.nombre || false .... esta cláusula nos soluciona el problema
                que se estaba generando, por el cual la primera vez que se carga el componente, y asignamos como value de los inputs 
                el bindeo con el hook, como aún no existen gran parte de las variables (nombre, apellidos, ciudad, correo etc...), React considera
                que esos inputs no están "controlados", por lo que nos daba error, por lo tanto, al hacer uso de || false, en caso de que esos
                inputs no estén controlados, les damos el valor false que React lo interpreta como que están a la espera de recibir datos.*/}
                <div className="user"><input value={userData?.nombre || false} name="nombre" onChange={manejaInputs} /></div>
                <div className="user"><input value={userData?.apellidos || false} name="apellidos" onChange={manejaInputs} /></div>
                <div className="user"><input value={userData?.ciudad || false} name="ciudad" onChange={manejaInputs} /></div>
                <div className="user"><input value={userData?.correo || false} name="correo" onChange={manejaInputs} /></div>
                <div className="user"><input value={userData?.telefono || false} name="telefono" onChange={manejaInputs} /></div>
                <div className="user"><input value={userData?.direccion || false} name="direccion" onChange={manejaInputs} /></div>
                <div className="user" onClick={() => logOut()}>LOGOUT</div>
            </div>
        )

    } else {
        return (
            <div className="designProfile">
                NADIE SABE NADA DE NINGÚN USUARIO---
            </div>
        )
    }


};

export default connect((state) => ({
    credentials: state.credentials
}))(Profile);
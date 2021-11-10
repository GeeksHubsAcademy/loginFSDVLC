
import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import './Profile.css';
import { LOGOUT } from '../../redux/types';

const Profile = (props) => {

    const logOut = () => {
        //limpio redux...por lo tanto deslogueo
        
        props.dispatch({type:LOGOUT});

    }

    if(props.credentials?.token !== ''){
        return (
            <div className="designProfile">
                <div className="user">{props.credentials?.usuario?.nombre}</div>
                <div className="user">{props.credentials?.usuario?.apellidos}</div>
                <div className="user">{props.credentials?.usuario?.ciudad}</div>
                <div className="user">{props.credentials?.usuario?.correo}</div>
                <div className="user">{props.credentials?.usuario?.telefono}</div>
                <div className="user">{props.credentials?.usuario?.direccion}</div>
                <div className="user" onClick={()=>logOut()}>LOGOUT</div>
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

export default connect((state)=>({
    credentials: state.credentials
}))(Profile);
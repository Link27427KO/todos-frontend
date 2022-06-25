import React from 'react';
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {logout} from "../../reducers/userReducer";

import Logo from "../../assets/img/navbar-logo.svg"
import Button from '@mui/material/Button'

const Navbar = () => {
    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()

    return (
        <div className="navbar">
            <div className="container">
                <img src={Logo} alt="" />
                <div className="navbar__header">Welcome to the todos</div>
                {!isAuth && <div className="navbar__login"><NavLink to="/login"><Button>Авторизация</Button></NavLink></div> }
                {!isAuth && <div className="navbar__registration"><NavLink to="/registration"><Button>Регистрация</Button></NavLink></div> }
                {isAuth && <div className="navbar__login" onClick={() => dispatch(logout())} ><Button>Выход</Button></div> }
            </div>
        </div>
    );
};

export default Navbar;
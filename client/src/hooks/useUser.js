import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import Context from '../context/UserContext';
//import { SERVER_URL } from '';


export default function useUser(){
    
    const {user, setUser} = useContext(Context);
    //estado de control
    const [loadingState,setLoadingState]= useState({
                                            errors: false,
                                            message:''    
                                            });
    const history = useHistory();

    const login = async ({login, password})=>{
        //values es un objeto que tiene props login y password
        try {
            setLoadingState({loading:true, errors: false});
            const res = await axios({
                url: 'http://localhost:3001/api/login',
                method:'POST',
                data: {login,password}
            })
            const {name, last_name, profile} = res.data.user;
            const token = res.data.token;
            const userSesion = {name,last_name,profile, token};
            window.sessionStorage.setItem('user',JSON.stringify(userSesion));
            setLoadingState({errors: false});
            //seteo userContext
            setUser(userSesion);
            history.push('/home');
        } catch (error) {
            console.error('ERROR LOGIN',error.response.data.message)
            window.sessionStorage.removeItem('user');
            setUser(null);
            setLoadingState({
                errors: true,
                message: error.response.data.message
            });
        }
    }

    const logout = ()=>{
        window.sessionStorage.removeItem('user');
        setUser(null);
        history.push('/');
    }

    return {
        isLogged:Boolean(user),
        login,
        logout,
        hasLoginError:loadingState.errors,
        errorMessage:loadingState.message
    }
}
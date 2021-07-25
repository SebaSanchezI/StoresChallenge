import { useState, useContext,useEffect } from 'react';
import { useHistory } from 'react-router-dom';
//Material UI
import { 
        InputAdornment,
        FormControl,
        IconButton,
        OutlinedInput,
        Button
        } from '@material-ui/core';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import styleLogin from './login.module.css'
import useUser from '../../hooks/useUser';
import Context from '../../context/UserContext';
import { getToken } from '../../Functions/functions';
import { Alert } from '../../Functions/functions';

const Login = () => {


    const {user} = useContext(Context);
    const [values, setValues] = useState({
        login: '',
        password: '',
        showPassword: false,
    });
    
    const {login,hasLoginError,errorMessage} = useUser();
    const history = useHistory();

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
    
    const handleSubmit = (e)=>{
        e.preventDefault()
        //consulta a la ruta
        if(!values.login || !values.password) {
            console.log('pase ')
            Alert('Fields can not be empty.','warning')//colocar Constantes >> crear archivo
        }
        else { console.log('pase else');
            login(values);
            setValues({
                login: '',
                password: '',
            })
        }

    }

    
    //si esta logueado no puede volver a login
    //redirigir a home
    useEffect(() => {
        if(getToken()) history.push('/home');
        // eslint-disable-next-line
    }, [user])

    return ( 
        <div className={styleLogin.ctn}>
            <div className={styleLogin.login}>
                <h1>LOGIN</h1>
                <form onSubmit={handleSubmit} className={styleLogin.form}>
                <FormControl   variant="filled" >
                    <OutlinedInput
                        id='inputLogin'
                        className={styleLogin.text}
                        label='Login'
                        name='login'
                        autoFocus={true}
                        placeholder="Enter your email or username"
                        onChange={handleChange}
                        margin='dense'
                        value={values.login}
                    />
                </FormControl>   
                <FormControl    
                    className={styleLogin.form}> 
                    <OutlinedInput
                        id='inputPassword'
                        className={styleLogin.text}
                        label='Pasword'
                        name='password'
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        margin='dense'
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                className={styleLogin.text}
                                onClick={handleClickShowPassword}
                                edge="end"
                            >
                            {values.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                        }    
                    />
                    </FormControl>
                    <FormControl    
                                className={styleLogin.formAction}> 
                    <Button
                        id='btn'
                        variant="contained"
                        color="primary"
                        type='submit'
                        margin='dense'
                        size='medium'
                        >            
                                    SingIn
                    </Button>
                </FormControl>
                {hasLoginError && Alert (errorMessage,'error') }
                </form>
            </div>
        </div>
    );
}
 



export default Login;
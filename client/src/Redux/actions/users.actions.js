//const
import axios from 'axios';
const SERVER_URL = 'http://localhost:3001/api';
const GET_USER = 'GET_USER';
const GET_ALL_USER = 'GET_ALL_USER';
const CLEAN_ALL_USERS = 'CLEAN_ALL_USERS';
//Get AllUsers
export const getAllUsers = (token) => async (dispatch) =>{

    try {
        
        const {data} = await axios({
            url: SERVER_URL + '/users',
            method:'GET',
            headers:{
                authorization: 'Bearer ' + token
            }
        });

        dispatch({
            type:GET_ALL_USER,
            payload:data.users
        });

    } catch (error) {
        console.log('Error de getAllUsers',error);
        //hacer type Error(error)
    }
};

//Get user
export const getUser = (token,id) => async (dispatch) =>{

    try {
        
        const {data} = await axios({
            url: SERVER_URL + '/users/' + id,
            method:'GET',
            headers:{
                Authorization: 'Bearer ' + token
            }
        });

        dispatch({
            type:GET_USER,
            payload:data 
        });

    } catch (error) {
        console.log('Error de getUser',error);
        //hacer type Error(error)
    }
};

//Add user
export const addUser = async (token,user) => {

    try {
        const {data} = await axios({
            url: SERVER_URL + '/users',
            method:'POST',
            headers: {
                Authorization: 'Bearer ' + token
            },
            data:user
        });
        return data.message;

    } catch (error) {
        console.log('Error de addUser',error);
        //hacer type Error(error)
        return error.message;
    }
};

//Update user
export const updateUser = async (token,user) => {
    console.log('user de update', user)
    console.log('token de update', token)
    try {
        const {data} = await axios({
            url: SERVER_URL + '/users',
            method:'PUT',
            headers: {
                Authorization: 'Bearer ' + token
            },
            data: user
        });

        return data.message;

    } catch (error) {
        console.log('Error de updateUser',error);
        //hacer type Error(error)
        return error.message;
    }
};

//Delete user
export const deleteUser = async(token,id) => {

    try {
        const {data} = await axios({
            url: SERVER_URL + '/users/' + id,
            method:'DELETE',
            headers: {
                Authorization: 'Bearer ' + token
            },
        });

        return data.message;

    } catch (error) {
        console.log('Error de deleteUser',error);
        //hacer type Error(error)
        return error.message;
    }
};

//funciones de limpieza
export const cleanAllUsers = ()=>(dispatch)=>{
    dispatch({
        type: CLEAN_ALL_USERS,
    });
}
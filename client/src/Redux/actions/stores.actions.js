//const
import axios from 'axios';
const SERVER_URL = 'http://localhost:3001/api';
const GET_STORES = 'GET_STORES';
const GET_USERS = 'GET_USERS';
const GET_STATS = 'GET_STATS';
const CLEAN_USERS_STORE = 'CLEAN_USERS_STORE';



//***CONSULTAS API***

export const getStores = (token) => async (dispatch) =>{
    
    try {
        
        const {data} = await axios({
                url: SERVER_URL + '/stores',
                method:'GET',
                headers:{
                    authorization: "Bearer " + token
                }
            });

        dispatch({
            type:GET_STORES,
            payload:data.stores 
        });

    } catch (error) {
        console.log('Error de getStores', {error});
        //hacer type Error(error)
    }
};


//Users for store

export const getUsers = ( id,token ) => async (dispatch)=>{
    try {

        const {data} = await axios({
            url: SERVER_URL + '/stores/' + id,
            method:'GET',
            headers: {  
                Authorization: 'Bearer ' + token
            },
        });

        dispatch({
            type:GET_USERS,
            payload:data
        });

    } catch (error) {
        console.log('Error de getUsers',error);
        //hacer type Error(error)
    }
}


//Stats

export const getStats = (id,token) => async (dispatch)=>{

    try {
        const {data} = await axios({
            url: SERVER_URL + '/stores/stats/' + id,
            method:'GET',
            headers: {
                authorization: 'Bearer ' + token
            },
        });

        dispatch({
            type:GET_STATS,
            payload:data.stats
        });

    } catch (error) {
        console.log('Error de getStats',error);
        //hacer type Error(error)
    }
};


//FUNCIONES DE LIMPIEZA DE STATE

export const  cleanUsersStore = ()=>(dispatch)=>{
    let arrEmpty = [];
    dispatch({
        type:CLEAN_USERS_STORE,
        payload: arrEmpty
    })
}





import React, { useState, useContext,useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import Context from '../../context/UserContext';
//import useUser from '../../hooks/useUser';
//Material UI
import { CircularProgress } from '@material-ui/core';

import StyleHome from './home.module.css'
//componentes
import Navbar from '../Navbar/Navbar';
import CardStore from '../CardStore/CardStore'
import Footer from '../Footer/Footer';

//Actions
import {getStores} from '../../Redux/actions/stores.actions'
import { getToken } from '../../Functions/functions';


const Home = () => {

    const {user} = useContext(Context);
    
    const history = useHistory();
    
    const [listCards,setListCards] = useState([]);

    const stores = useSelector(store => store.storeReducer.stores);

    const dispatch = useDispatch();

    //Carga las tiendas cuando se inicia la pagina por primera vez
    useEffect(() => {
        if(!getToken()) history.push('/');
        else dispatch(getStores(getToken()));
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        setListCards(stores);
    }, [stores])

    
        
   
        return (
            <>
                <Navbar />
                <div className={StyleHome.ctn}>
                    <h1>STORES </h1> 
                        <div className={StyleHome.cards}>
                        { listCards.length === 0 ?
                            <CircularProgress/>
                            :
                            listCards.map((item,i)=>
                                
                                    <CardStore      key={i}
                                                    name={item.name.toUpperCase()}
                                                    imageUrl={item.image }
                                                    address={item.address }
                                                    city={item.city }
                                                    id={item.id || 0}
                                    />
                            )
                        }
                        </div> 
                </div>
                <Footer/>
            </>
            )
}

export default Home;

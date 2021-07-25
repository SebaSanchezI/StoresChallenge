import React, { useState,useEffect } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import styleChart from './chart.module.css';
//material UI
import { CircularProgress } from '@material-ui/core';
//components
import PieChart from './PieChart';
import DoughnutChart from './DoughnutChart';
//Actions
import {getStats} from '../../Redux/actions/stores.actions'
import {getToken} from '../../Functions/functions'


const Charts = ({id}) => {

    const [stats, setStats] = useState(null);
    const statsDetails = useSelector(store => store.storeReducer.stats);
    const dispatch = useDispatch();

    //Despacha la accion para la carga del state
    useEffect(() => {
      dispatch(getStats(id,getToken()));
    }, [dispatch,id])

    //setea el estado cuando se cargan los datos en el state
    useEffect(() => {
      setStats(statsDetails);
    }, [statsDetails])

    

    return ( 
        <div className={styleChart.ctn}> 
          {!stats ? 
            <CircularProgress /> 
          :
            <div>
              <div>
                  <h1>TOTAL USERS: {stats.cashier + stats.supervisor}</h1>
              </div>
              <div className={styleChart.graphics}>
                  <PieChart stats={stats}/>
                  <DoughnutChart stats={stats}/>
              </div>
            </div>

          }
        </div>
     );
}
 
export default Charts;
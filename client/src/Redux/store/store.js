import { createStore, combineReducers, applyMiddleware} from "redux";
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from "redux-thunk";

import {storeReducer} from '../reducer/store.reducer';
import {userReducer} from '../reducer/user.reducer';

//combinar los reducer por tipo de usuario
//luego pasar ese reducer al allReducer

const allReducer = combineReducers({
    storeReducer,
    userReducer
});

const store = createStore(allReducer,
    composeWithDevTools(applyMiddleware(thunk)))

export default store;

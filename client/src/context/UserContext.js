import React, {useState} from 'react';

const Context = React.createContext({});

export function UserContextProvider ({children}){

    const [user,setUser] = useState(
        //la funcion se ejecuta una sola vez
       () => window.sessionStorage.getItem('user')
    );
    
    return <Context.Provider value = {{user,setUser}} >
        {children}
    </Context.Provider>
}

export default Context;
import useUser from "../../hooks/useUser"
import { renderHook } from '@testing-library/react-hooks'

describe('Pruebas hook useUser', () => {
    
    test('debe retornar el inicial state', () => {
        //config    
        //render hook crea un componente virtual donde incertamos el hook
        const { result } = renderHook(() => useUser());
        const { isLogged,hasLoginError,errorMessage } = result.current; 
        
        expect (isLogged).toBe(false);
        expect (hasLoginError).toBe(false);
        expect (errorMessage).toEqual('');
    })
    
    test('funcion login debe retornar un usuario y token', () => {
        
        const  result = renderHook();
        console.log(result)
    })
    

})

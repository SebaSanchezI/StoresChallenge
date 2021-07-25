import React from "react";
import { shallow } from "enzyme";
import Login from '../../components/login/Login';
import '@testing-library/jest-dom';


/* 
1- que renderice todo el componente
2- que los input esten vacios al iniciar
3- no enviar info en el submit si los campos estan vacios
4- envie la info si los campos estan bien, limpiar los inpust

*/

describe('Probando componente <Login />', () => {
    const Alert = jest.fn();
    const login = jest.fn();
    const wrapper = shallow(<Login/>);


    beforeEach(()=>{
        jest.clearAllMocks();
    })
    
    test('debe renderizar correctamente el componente.', () => {
        expect(wrapper).toMatchSnapshot();
    })
    
    test('debe tener input Login vacio al iniciar', () => {
        
        const inputLogin = wrapper.find('#inputLogin');
        expect(inputLogin.text()).toBe('');

    })

    test('debe tener input Password vacio al iniciar', () => {
        
        const inputPassword = wrapper.find('#inputPassword');
        expect(inputPassword.text()).toBe('');

    })

    
    // test('debe ejecutar la funcion Alert si los campos estan vacios en el submit', () => {
        
    //     //para evaluar funcionalidades se utiliza jest.fn()
        
    //     //el {} hace referencia al evento enviado
    //     wrapper.find('form').simulate('submit',{ preventDefault(){} });
        
    //     expect(Alert).toHaveBeenCalled();
        
    // })
     
    test('debe llamar a la funcion Login y limpiar los campos de texto', () => {
        
        const userLogin = 'sebastian';
        const userPassword = '123456';
        //simulo el inputChange
        wrapper.find('#inputLogin').simulate('change',{target:{name:'login',value:userLogin}});
        wrapper.find('#inputPassword').simulate('change',{target:{name:'password',value:userPassword}});
        //simulo el submit
        wrapper.find('form').simulate('submit',{ preventDefault(){}});

        expect( wrapper.instance().Alert ).toHaveBeenCalled();
        //determinar si los input se limpiaron
        expect( wrapper.find('#inputLogin').prop('value') ).toBe('');
        expect( wrapper.find('#inputPassword').prop('value') ).toBe('');
        // expect( inputPassword.text() ).toBe('');

    })

    
})

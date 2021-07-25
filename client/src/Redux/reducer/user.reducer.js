
const initialState = {
    allUsers:[],
    user: {}

}


export const userReducer = (state = initialState, action)=>{
    switch(action.type){
        case 'GET_USER':
            return {
                ...state,
                user: action.payload.user,
            };
            case 'GET_ALL_USER':
                return {
                    ...state,
                    allUsers: action.payload,
                };
            case 'CLEAN_ALL_USERS':
                return {
                    ...state,
                    allUsers: []
                };            
        default:{
            return state
        }
    }

}
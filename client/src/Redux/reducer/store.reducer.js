
const initialState = {
    
    stores:[],
    users:[],
    stats:{}

}

export const storeReducer = (state = initialState, action)=>{
    switch(action.type){
        case 'GET_STORES':
            return {
                ...state,
                stores: action.payload
            }
        case 'GET_USERS':
            return{
                ...state,
                users: action.payload.users
            }
        case 'GET_STATS':
            return{
                ...state,
                stats: action.payload
            }
            case 'CLEAN_USERS_STORE':
                return{
                    ...state,
                    users: action.payload
                }
        default:{
            return state
        }
    }

}
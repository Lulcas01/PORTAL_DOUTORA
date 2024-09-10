import { ADD_PAGAMENTO, DELETE_PAGAMENTO, FAIL_REQUEST, GET_PAGAMENTO_LIST, GET_PAGAMENTO_OBJ, MAKE_REQUEST, UPDATE_PAGAMENTO } from "./ActionType"

const initialstate = {
    loading: true,
    PAGAMENTOlist: [],
    PAGAMENTOobj: {},
    errmessage: ''
}

export const Reducer = (state = initialstate, action) => {
    switch (action.type) {
        case MAKE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FAIL_REQUEST:
            return {
                ...state,
                loading: false,
                errmessage: action.payload
            }
        case GET_PAGAMENTO_LIST:
            return {
                loading: false,
                errmessage: '',
                PAGAMENTOlist: action.payload,
                PAGAMENTOobj: {}
            }
        case DELETE_PAGAMENTO: return {
            ...state,
            loading: false
        }
        case ADD_PAGAMENTO: return {
            ...state,
            loading: false
        }
        case UPDATE_PAGAMENTO: return {
            ...state,
            loading: false
        }
        case GET_PAGAMENTO_OBJ: return {
            ...state,
            loading: false,
            PAGAMENTOobj: action.payload
        }
        default: return state
    }
}
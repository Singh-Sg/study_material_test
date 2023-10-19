import { GET_LIST_RESPONCE, POST_LIST_RESPONCE, PARTICULAR_RESPONCE } from "../action/Action"

const initialState = {
    Listdata: null,
    postdata: null,
    idData: null,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_LIST_RESPONCE:
            return {
                ...state,
                Listdata: action.list
            }
        case POST_LIST_RESPONCE:
            return {
                ...state,
                postdata: action.postlist
            }
        case PARTICULAR_RESPONCE:
            return {
                ...state,
                idData: action.idData
            }
        default:
            return state
    }
}

export default reducer
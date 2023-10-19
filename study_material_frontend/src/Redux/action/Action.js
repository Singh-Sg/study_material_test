import axios from "axios";
export const GET_LIST_RESPONCE = "GET_LIST_RESPONCE"
export const POST_LIST_RESPONCE = "POST_LIST_RESPONCE"
export const PARTICULAR_RESPONCE = "PARTICULAR_RESPONCE"

export const GetListResponce = (data) => {
    return {
        type: GET_LIST_RESPONCE,
        list: data
    }
}
export const postListResponce = (data) => {
    return {
        type: POST_LIST_RESPONCE,
        postlist: data
    }
}

export const particularResponce = (data) => {
    return {
        type: PARTICULAR_RESPONCE,
        idData: data
    }
}

export const getList = () => {
    return (dispatch) => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/generate_summary/`)
            .then((res) => {
                if(res.data.length==0){
                    dispatch(GetListResponce(null))
                }
                else{
                    dispatch(GetListResponce(res.data))
                }
            })
            .catch((err)=>{
                console.log(err)
            })

    }
}

export const postPDF = (payload) => {
    return (dispatch) => {
        dispatch(GetListResponce([]))
        axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/generate_summary/`, payload)
            .then((res) => {
                dispatch(getList())
                dispatch(postListResponce(res))
            })

    }
}

export const getparticularData = (id) => {
    return (dispatch) => {
        dispatch(particularResponce([]))
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/get_summary/${id}`)
        .then((res) => {
            dispatch(particularResponce(res.data))
        })

    }
}

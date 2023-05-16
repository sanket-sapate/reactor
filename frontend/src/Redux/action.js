import Axios from 'axios'
import config from '../config.js';

const axios = Axios.create({
    baseURL: config.API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
})

export const action = async (dispatch,getState)=>{
    if(!getState().department){
        let {data:payload} = await axios.get('/department')
        dispatch({
            type:"ADD-DEPARTMENT",
            payload
        })
    }
}
import Axios from 'axios'
import config from '../config.js';

export const axios = Axios.create({
    baseURL: config.API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
})
axios.interceptors.request.use(function (config1) {

    // Do something before request is sent
    const {GET_COOKIE} = config
    const token = GET_COOKIE('auth-token')
    if (token) {
        config1.headers.Authorization = `Bearer ${token}`
    }

    return config1;
  }, function (error) {

    // Do something with request error
    return Promise.reject(error);
});
export const departmentAction = async (dispatch,getState)=>{
    if(!getState().department){
        let {data:payload} = await axios.get('/department')
        dispatch({
            type:"ADD-DEPARTMENT",
            payload
        })
    }
}

export const subjectAction = (department)=>{
    return async function (dispatch,getState){
        if(!getState().topics[department]){
            let {data:payload} = await axios.get(`/department/${department}`)
            dispatch({
                type:"ADD-TOPICS",
                payload,
                department
            })
        }
    } 
}

export const topicAction = (department,subject)=>{
    return async function (dispatch,getState){
        if(getState().topic?.url_param!==subject && getState().topic?.department!==department ){
            let {data:payload} = await axios.get(`/department/${department}/${subject}`)
            dispatch({
                type:"ADD-TOPIC",
                payload,
            })
        }
    }
}

export const userDetailAction = (payload)=>{
    return async function (dispatch,getState){
        dispatch({
            type:"CHANGE-USER",
            payload,
        })
    }
}

export const isLogin = ()=>{
    return async function (dispatch,getState){
        const data = await axios.get('/auth/loggedInUser')
        
        dispatch(userDetailAction(data?.data?.data))
    }
}
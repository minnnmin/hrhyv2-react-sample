import axios from 'axios';

const FLASK_URL = process.env.REACT_APP_BACKEND_URL;

export function getPhones(){
    return axios.get(`http://${FLASK_URL}/phones`)
}

export function addPhone(param) {
    return axios({
        method: 'post',
        url : `http://${FLASK_URL}/addPhone`,
        data: param
    })
}

export function deletePhone(param) {
    return axios({
        method: 'post',
        url : `http://${FLASK_URL}/deletePhone`,
        data: param
    })
}

export function updatePhone(param) {
    return axios({
        method: 'post',
        url : `http://${FLASK_URL}/updatePhone`,
        data: param
    })
}

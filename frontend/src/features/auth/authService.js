import axios from 'axios'

const API_URL_REGISTER = '/api/users/'
const API_URL_LOGIN = '/api/users/login'
const API_URL_UPDATE = '/api/users/stats'


// Register 
const register = async (userData) => {
    const response = await axios.post(API_URL_REGISTER, userData)

    if(response.data) {
        localStorage.setItem('user',JSON.stringify(response.data))
    }

    return response.data
}

const login = async (loginData) => {
    const response = await axios.post(API_URL_LOGIN, loginData)

    if(response.data) {
        localStorage.setItem('user',JSON.stringify(response.data))
    }

    return response.data
}

const updateMyStats = async (statData) => {
    console.log(JSON.parse(localStorage.getItem('user')).token.toString())

    const Token = { headers: {Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user')).token.toString()} }
    //console.log("KJAKAJSK")
    const response = await axios.put(API_URL_UPDATE, statData, Token)

    if(response.data) {
        const user = JSON.parse(localStorage.getItem('user'))
        user.stats = response.data;
        response.data = user

        localStorage.setItem('user',JSON.stringify(response.data))
    }
    
    return response.data
}


const authService = {
    register,
    login,
    updateMyStats
}

export default authService

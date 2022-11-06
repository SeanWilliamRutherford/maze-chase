import axios from 'axios'

//const API_URL_GET = '/api/stats'
const API_URL_UPDATE = '/api/stats/'+localStorage.getItem('user').id.toString()


// get stats 
const getStats = async (userData) => {
    const response = await axios.post(API_URL_REGISTER, userData)

    if(response.data) {
        localStorage.setItem('user',JSON.stringify(response.data))
    }

    return response.data
}

const updateStats = async (loginData) => {
    const response = await axios.put(API_URL_UPDATE, loginData)

    if(response.data) {
        localStorage.setItem('stats',JSON.stringify(response.data))
    }

    return response.data
}


const statService = {
    updateStats,
}

export default statService
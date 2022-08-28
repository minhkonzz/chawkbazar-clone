import axios from 'axios'

const axiosInstance = axios.create({
   baseURL: 'https://62f3d1c5a84d8c96812d1ccc.mockapi.io/'
})

export default axiosInstance
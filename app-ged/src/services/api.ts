import axios from 'axios'

const api = axios.create({
  baseURL: 'https://backend-ged.vercel.app/api/ged',
})

export default api
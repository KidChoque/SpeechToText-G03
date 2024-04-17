import axios from 'axios'

//Declarar a porta da api

const portaApi = '5173'

//Definir a base da url de acesso da api

const apiUrlLocal = `http://localhost:${portaApi}`

//Configurar o axios
const api = axios.create({
    baseURL: apiUrlLocal
})

export default api;
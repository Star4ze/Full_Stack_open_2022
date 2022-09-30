import axios from 'axios'

const baseURL = 'http://localhost:3001/persons/'

const getAll = () => {
    const request = axios.get(baseURL)
    return request.catch(err => console.log(err))
}

const create = newObject => {
    const request = axios.post(baseURL, newObject)
    return request.catch(err => console.log(err))
}

const update = (id, newObject) => {
    const request = axios.put(`${baseURL}${id}`, newObject)
    return request.catch(err => console.log(err))
}

const remove = id => {
    const request = axios.delete(baseURL.concat(id))
    return request
}

const personsService = { getAll, create, update, remove }

export default  personsService
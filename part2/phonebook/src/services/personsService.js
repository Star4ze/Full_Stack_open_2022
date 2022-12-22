import axios from 'axios'
const baseURL = '/api/persons/'

const getAll = () => {
    const request = axios.get(baseURL)
    return request.catch(err => console.log(err))
}

const create = newObject => axios.post(baseURL, newObject)

const update = (id, newObject) => axios.put(`${baseURL}${id}`, newObject)

const remove = id => axios.delete(baseURL.concat(id))

const personsService = { getAll, create, update, remove }

export default  personsService
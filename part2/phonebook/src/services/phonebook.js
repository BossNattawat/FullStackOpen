import axios from "axios";
const baseUrl = "http://localhost:3001/persons"

function getAll() {
    return axios.get(baseUrl)
}

function create(newPerson) {
    return axios.post(baseUrl, newPerson)
}

function deleteById(id) {
    return axios.delete(`${baseUrl}/${id}`)
}

function update(id, newPerson) {
    return axios.put(`${baseUrl}/${id}`, newPerson)
}

export { getAll, create, deleteById, update }
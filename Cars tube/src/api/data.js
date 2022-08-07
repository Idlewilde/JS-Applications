import * as api from './api.js';

const endpoints = {
    'allElements': '/data/cars?sortBy=_createdOn%20desc',
    'searchedElements':'/data/cars?where=year%3D',
    'elementById': '/data/cars/',
    'elementsByUser':'/data/cars?where=_ownerId%3D%22',
    'create': '/data/cars'
};

export async function allElements() {
    return api.get(endpoints.allElements);
}

export async function searchedElements(query) {
    return api.get(endpoints.searchedElements+query);
}

export async function getById(id) {
    return api.get(endpoints.elementById + id);
}

export async function editById(id, data) {
    return api.put(endpoints.elementById + id, data);
}

export async function elementsByUser(id){
    return api.get(endpoints.elementsByUser+id+'%22&sortBy=_createdOn%20desc');
}

export async function create(data) {
    return api.post(endpoints.create, data);
}

export async function deleteById(id) {
    return api.delete(endpoints.elementById + id);
}



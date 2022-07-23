import * as api from './api.js';

const endpoints = {
    'allElements': '/data/memes?sortBy=_createdOn%20desc',
    'elementsByUser': '/data/memes?where=_ownerId%3D%22',
    'elementById': '/data/memes/',
    'create': '/data/memes',
};

export async function getAll() {
    return api.get(endpoints.allElements);
}

export async function getByUser(userId) {
    return api.get(endpoints.elementsByUser + userId + '%22&sortBy=_createdOn%20desc');
}

export async function getById(id) {
    return api.get(endpoints.elementById + id);
}

export async function editById(id, data) {
    return api.put(endpoints.elementById + id, data);
}

export async function create(data) {
    return api.post(endpoints.create, data);
}

export async function deleteById(id) {
    return api.delete(endpoints.elementById + id);
}




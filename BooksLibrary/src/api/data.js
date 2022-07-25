import * as api from './api.js';

const endpoints = {
    'allElements': '/data/books?sortBy=_createdOn%20desc',
    'elementsByUser': '/data/books?where=_ownerId%3D%22',
    'elementById': '/data/books/',
    'create': '/data/books',
    'like': '/data/likes',
    'likes': '/data/likes?where=bookId%3D%22',
    'likesById': '/data/likes?where=bookId%3D%22'
};

export async function allElements() {
    return api.get(endpoints.allElements);
}

export async function elementsByUser(userId) {
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

export async function like(data) {
    return api.post(endpoints.like, data);
}

export async function getLikes(id) {
    return api.get(endpoints.likes + id + '%22&distinct=_ownerId&count');
}

export async function getLikesByUser(bookId, userId) {
    return api.get(endpoints.likesById + bookId + '%22%20and%20_ownerId%3D%22'+userId+'%22&count');
}

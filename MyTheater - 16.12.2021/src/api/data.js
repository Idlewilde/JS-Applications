import * as api from './api.js';

const endpoints = {
    'theaters': '/data/theaters?sortBy=_createdOn%20desc&distinct=title',
    'theatersByUser': '/data/theaters?where=_ownerId%3D%22',
    'theatersById': '/data/theaters/',
    'create': '/data/theaters',
    'like': '/data/likes',
    'likes': '/data/likes?where=theaterId%3D%22',
    'likesById': '/data/likes?where=theaterId%3D%22'
};

export async function getAllTheaters() {
    return api.get(endpoints.theaters);
}

export async function getTheatersByUser(userId) {
    return api.get(endpoints.theatersByUser + userId + '%22&sortBy=_createdOn%20desc');
}

export async function getById(id) {
    return api.get(endpoints.theatersById + id);
}

export async function editById(id, theaterData) {
    return api.put(endpoints.theatersById + id, theaterData);
}

export async function createTheater(theaterData) {
    return api.post(endpoints.create, theaterData);
}

export async function deleteById(id) {
    return api.delete(endpoints.theatersById + id);
}

export async function likeTheater(theaterIdObject) {
    return api.post(endpoints.like, theaterIdObject);
}

export async function getLikes(id) {
    return api.get(endpoints.likes + id + '%22&distinct=_ownerId&count');
}

export async function getLikesByUser(theaterId, userId) {
    return api.get(endpoints.likesById + theaterId + '%22%20and%20_ownerId%3D%22'+userId+'%22&count');
}




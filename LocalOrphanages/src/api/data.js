import * as api from './api.js';

const endpoints = {
    'allElements': '/data/posts?sortBy=_createdOn%20desc',
    'elementById': '/data/posts/',
    'elementsByUser':'/data/posts?where=_ownerId%3D%22',
    'create': '/data/posts',
    'donate': '/data/donations',
    'getDonations': '/data/donations?where=postId%3D%22'
};

export async function allElements() {
    return api.get(endpoints.allElements);
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

export async function donate(data) {
    return api.post(endpoints.donate, data);
}

export async function getDonations(id) {
    return api.get(endpoints.getDonations + id + '%22&distinct=_ownerId&count');
}

export async function getDonationsByUser(postId, userId) {
    return api.get(endpoints.getDonations + postId + '%22%20and%20_ownerId%3D%22'+userId+'%22&count');
}

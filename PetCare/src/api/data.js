import * as api from './api.js';

const endpoints = {
    'allElements': '/data/pets?sortBy=_createdOn%20desc&distinct=name',
    'elementById': '/data/pets/',
    'create': '/data/pets',
    'donate': '/data/donation',
    'getDonations': '/data/donation?where=petId%3D%22'
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

export async function getDonationsByUser(petId, userId) {
    return api.get(endpoints.getDonations + petId + '%22%20and%20_ownerId%3D%22'+userId+'%22&count');
}

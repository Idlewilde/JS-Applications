import * as api from './api.js';

const endpoints = {
    'allElements': '/data/offers?sortBy=_createdOn%20desc',
    'elementById': '/data/offers/',
    'create': '/data/offers',
    'extra': '/data/applications',
    'getExtra': '/data/applications?where=offerId%3D%22',
    'extraByUser':'/data/applications?where=offerId%3D%22'
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

export async function extra(data) {
    return api.post(endpoints.extra, data);
}

export async function getExtra(id) {
    return api.get(endpoints.getExtra + id + '%22&distinct=_ownerId&count');
}

export async function getExtraByUser(id, userId) {
    return api.get(endpoints.extraByUser + id + '%22%20and%20_ownerId%3D%22'+userId+'%22&count');
}

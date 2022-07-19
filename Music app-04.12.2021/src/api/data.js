import * as api from './api.js';

const endpoints = {
    'albums': '/data/albums?sortBy=_createdOn%20desc&distinct=name',
    'filteredAlbums': '/data/albums?where=name%20LIKE%20%22',
    'albumsById': '/data/albums/',
    'create': '/data/albums'
};

export async function getAllAlbums() {
    return api.get(endpoints.albums);
}

export async function getFilteredAlbums(searchWord) {
    return api.get(endpoints.filteredAlbums + searchWord + '%22');
}

export async function getById(id) {
    return api.get(endpoints.albumsById + id);
}

export async function editById(id, albumData) {
    return api.put(endpoints.albumsById + id, albumData);
}

export async function createAlbum(albumData) {
    return api.post(endpoints.create, albumData);
}

export async function deleteById(id) {
    return api.delete(endpoints.albumsById + id);
}


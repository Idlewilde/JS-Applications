import * as api from './api.js';

const endpoints = {
    'games': '/data/games?sortBy=_createdOn%20desc',
    'newGames': '/data/games?sortBy=_createdOn%20desc&distinct=category',
    'gamesById': '/data/games/',
    'create': '/data/games',
    'getComments': '/data/comments?where=gameId%3D%22',
    'postComments': '/data/comments',
};

export async function getAllGames() {
    return api.get(endpoints.games);
}

export async function getNewGames() {
    return api.get(endpoints.newGames);
}

export async function getById(id) {
    return api.get(endpoints.gamesById + id);
}

export async function editById(id, gameData) {
    return api.put(endpoints.gamesById + id, gameData);
}

export async function createGame(gameData) {
    return api.post(endpoints.create, gameData);
}

export async function deleteById(id) {
    return api.delete(endpoints.gamesById + id);
}

export async function postComment(commentData) {
    return api.post(endpoints.postComments, commentData);
}

export async function getComment(id) {
    return api.get(endpoints.getComments + id + '%22');
}




import { get, post } from './api.js';

const endpoints = {
    'login': '/users/login',
    'register': '/users/register',
    'logout': '/users/logout'

}

export async function login(username, password) {
    const user = await post(endpoints.login, { username, password });

    localStorage.setItem('user', JSON.stringify(user));

}

export async function register(username, password) {
    const user = await post(endpoints.register, { username, password });

    localStorage.setItem('user', JSON.stringify(user));
}

export async function logout() {
    get(endpoints.logout);
    localStorage.removeItem('user');

}
import { updateNav } from "../app.js";
import { register } from "../api/users.js";
import page from '../../node_modules/page/page.mjs';

const section = document.getElementById('register');
const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);

export function registerView(){
    document.getElementById('site-content').replaceChildren(section);
}

async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(form);
    const username = formData.get('username');
    const password = formData.get('password');

    if (username.trim().length > 0 && password.trim().length > 0) {

        await register(username, password);
        form.reset();
        updateNav();
        page.redirect('/');
    }
}
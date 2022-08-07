import { updateNav } from "../app.js";
import { login } from "../api/users.js";
import page from '../../node_modules/page/page.mjs';

const section = document.getElementById('login');
const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);


export function loginView(){
    document.getElementById('site-content').replaceChildren(section);
}

async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(form);
    const username = formData.get('username');
    const password = formData.get('password');

    if (username.trim().length > 0 && password.trim().length > 0) {
        await login(username, password);
        form.reset();
        updateNav();
        page.redirect('/');
    }
}
import { updateNav } from "../app.js";
import { register } from "../api/users.js";
import page from '../../node_modules/page/page.mjs';

const section = document.getElementById('register-page');
const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);

export function registerView(){
    document.getElementById('site-content').replaceChildren(section);
}

async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');

    if (email.trim().length > 0 && password.trim().length > 0) {

        await register(email, password);
        form.reset();
        updateNav();
        page.redirect('/');
    }
}
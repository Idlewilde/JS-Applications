import { updateNav } from "../app.js";
import { register } from "../api/users.js";
import page from '../../node_modules/page/page.mjs';

const registerPage = document.getElementById('registerPage');
const form = registerPage.querySelector('form');
form.addEventListener('submit', onSubmit);

export function registerView(){
    document.getElementById('content').replaceChildren(registerPage);
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

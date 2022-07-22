import { updateNav } from "../app.js";
import { login } from "../api/users.js";
import page from '../../node_modules/page/page.mjs'


const loginPage = document.getElementById('loginaPage');
const form = loginPage.querySelector('form');
form.addEventListener('submit', onSubmit);

export function loginView(){
    document.getElementById('content').replaceChildren(loginPage);
}

async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');

    if (email.trim().length > 0 && password.trim().length > 0) {
        await login(email, password);
        form.reset();
        updateNav();
        page.redirect('/');
    }
}
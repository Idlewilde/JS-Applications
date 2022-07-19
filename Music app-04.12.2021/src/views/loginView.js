import { login } from "../api/users.js";
import { showRegister } from "./registerView.js";

const section = document.getElementById('loginPage');
const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);

let ctx = null;

export function showLogin(context) {
    ctx = context;
    context.showSection(section);
}

async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');

    if (email.trim().length > 0 && password.trim().length > 0) {

        await login(email, password);
        form.reset();
        ctx.updateNav();
        ctx.goTo('/')
    }
}

document.getElementById('registerProfile').addEventListener('click', registerUser);

function registerUser(event) {
    event.preventDefault();
    ctx.goTo('/register');
}


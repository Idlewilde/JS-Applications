import { updateNav } from "../app.js";
import { register } from "../api/users.js";
import page from '../../node_modules/page/page.mjs';

const section = document.getElementById('register');
const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);

export function registerView(){
    document.getElementById('mainContent').replaceChildren(section);
}

async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(form);
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');
    const gender = formData.get('gender');

    if (email.trim().length > 0 && password.trim().length > 0 && username.trim().length>0) {

        await register({username, email, password, gender});
        form.reset();
        updateNav();
        page.redirect('/allMemes');
}else{document.getElementById('error-message').textContent='All fields are required';
document.getElementsByClassName('notification')[0].style.display='block';
window.setTimeout(closeNotification, 3000);}
}
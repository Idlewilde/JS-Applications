import page from '../node_modules/page/page.mjs'
import { logout } from './api/users.js';
import { allMemesView } from './views/allMemesView.js';
import { createView } from './views/createView.js';
import { detailsView } from './views/detailsView.js';
import { editView } from './views/editView.js';
import { homeView } from './views/homeView.js';
import { loginView } from './views/loginView.js';
import { profileView } from './views/profileView.js';
import { registerView } from './views/registerView.js';





page('/', homeView);
page('/allMemes', allMemesView);
page('/create', createView);
page('/login', loginView);
page('/register', registerView);
page('/edit/:id',editView);
page('/profile',profileView);
page('/details/:id',detailsView);
page('/logout',onLogout);

page.start();

updateNav();
document.getElementById('sections').style.display='none';

export function updateNav() {
    const user = localStorage.getItem('user');
    let userParsed = JSON.parse(localStorage.getItem('user'));
    const nav = document.querySelector('nav');
    if (user) {
        nav.querySelectorAll('.user').forEach(e => e.style.display = 'block');
        nav.querySelectorAll('.guest').forEach(e => e.style.display = 'none');
        document.getElementById('welcome-user').textContent=`Welcome, ${userParsed.email}`;
        page.redirect('/allMemes')

    }
    else {
        nav.querySelectorAll('.user').forEach(e => e.style.display = 'none');
        nav.querySelectorAll('.guest').forEach(e => e.style.display = 'block');
    }
}

function onLogout() {
    logout();
    updateNav();
    page.redirect('/');
}

export function closeNotification(){
    document.getElementsByClassName('notification')[0].style.display="none";
    }
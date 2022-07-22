import page from '../node_modules/page/page.mjs'
import { logout } from './api/users.js';
import { createView } from './views/createView.js';
import { detailView } from './views/detailView.js';
import { editView } from './views/editView.js';
import { homeView } from './views/homeView.js';
import { loginView } from './views/loginView.js';
import { profileView } from './views/profileView.js';
import { registerView } from './views/registerView.js';


updateNav();
document.getElementById('pagesInfo').style.display='none';



page('/', homeView);
page('/create', createView);
page('/login', loginView);
page('/register', registerView);
page('/edit/:id',editView);
page('/profile',profileView);
page('/detail/:id',detailView);
page('/logout',onLogout);


page.start();


export function updateNav() {
    const user = localStorage.getItem('user');
    const nav = document.querySelector('nav');
    if (user) {
        nav.querySelectorAll('.user').forEach(e => e.style.display = 'inline-block');
        nav.querySelectorAll('.guest').forEach(e => e.style.display = 'none');
    }
    else {
        nav.querySelectorAll('.user').forEach(e => e.style.display = 'none');
        nav.querySelectorAll('.guest').forEach(e => e.style.display = 'inline-block');
    }
}

function onLogout() {
    logout();
    updateNav();
    page.redirect('/');
}


import page from '../node_modules/page/page.mjs'
import { logout } from './api/users.js';
import { createView } from './views/createView.js';
import { detailsView } from './views/detailsView.js';
import { editView } from './views/editView.js';
import { homeView } from './views/homeView.js';
import { loginView } from './views/loginView.js';
import { profileView } from './views/profileView.js';
import { registerView } from './views/registerView.js';

updateNav();
document.getElementById('pre-display').style.display='none';

page('/', homeView);
page('/create', createView);
page('/login', loginView);
page('/register', registerView);
page('/edit/:id',editView);
page('/profile',profileView);
page('/details/:id',detailsView);
page('/logout',onLogout);


page.start();

export function updateNav() {
    const user = localStorage.getItem('user');
    const parsedUser = JSON.parse(localStorage.getItem('user'));
    if (user) {
        document.getElementById('user').style.display = 'block';
        document.getElementById('guest').style.display = 'none';
        document.getElementById('welcome-message').textContent=`Welcome, ${parsedUser.email}`
    }
    else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'block';
    }
}

function onLogout() {
    logout();
    updateNav();
    page.redirect('/');
}
import page from '../node_modules/page/page.mjs'
import { logout } from './api/users.js';
import { catalogView } from './views/catalogView.js';
import { createView } from './views/createView.js';
import { detailsView } from './views/detailsView.js';
import { editView } from './views/editView.js';
import { homeView } from './views/homeView.js';
import { loginView } from './views/loginView.js';
import { profileView } from './views/profileView.js';
import { byYearView } from './views/byYearView.js';
import { registerView } from './views/registerView.js';

updateNav();

document.getElementById('html-content').style.display='none';

page('/', homeView);
page('/create', createView);
page('/login', loginView);
page('/register', registerView);
page('/edit/:id',editView);
page('/byYear',byYearView);
page('/profile',profileView);
page('/catalog',catalogView);
page('/details/:id',detailsView);
page('/logout',onLogout);


page.start();





export function updateNav() {
    const user = localStorage.getItem('user');
    const parsed = JSON.parse(localStorage.getItem('user'));
    
    if (user) {
        document.getElementById('profile').style.display = 'block';
        document.getElementById('guest').style.display = 'none';
        document.getElementById('welcome-anchor').textContent=`Welcome ${parsed.username}`;
    }
    else {
        document.getElementById('profile').style.display = 'none';
        document.getElementById('guest').style.display = 'block';
    }
}

function onLogout() {
    logout();
    updateNav();
    page.redirect('/');
}
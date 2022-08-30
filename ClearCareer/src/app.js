import page from '../node_modules/page/page.mjs'
import { logout } from './api/users.js';
import { dashboardView } from './views/dashboardView.js';
import { createView } from './views/createView.js';
import { detailsView } from './views/detailsView.js';
import { editView } from './views/editView.js';
import { loginView } from './views/loginView.js';
import { registerView } from './views/registerView.js';
import { homeView } from './views/homeView.js';

updateNav();
document.getElementById('all-sections').style.display='none';


page('/create', createView);
page('/', homeView);
page('/login', loginView);
page('/register', registerView);
page('/edit/:id',editView);
page('/dashboard',dashboardView);
page('/details/:id',detailsView);
page('/logout',onLogout);


page.start();

export function updateNav() {
    
    const user = localStorage.getItem('user');
    
    if (user) {
        document.getElementsByClassName('user')[0].style.display = 'block';
        document.getElementsByClassName('guest')[0].style.display = 'none';
    }
    else {
        document.getElementsByClassName('user')[0].style.display = 'none';
        document.getElementsByClassName('guest')[0].style.display = 'block';
    }
}

function onLogout() {
    logout();
    updateNav();
    page.redirect('/dashboard');
}
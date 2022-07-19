
import { showHome } from '../src/views/homeView.js'
import { logout } from './api/users.js';
import { initialize } from "./router.js";
import { showCatalog } from './views/catalogView.js';
import { showCreate } from './views/createView.js';
import { showDetail } from './views/detailView.js';
import { showEdit } from './views/editView.js';
import { showLogin } from './views/loginView.js';
import { showRegister } from './views/registerView.js';
import { showSearch } from './views/searchView.js';

document.getElementById('content').replaceChildren();

const links = {
    '/': showHome,
    '/catalog': showCatalog,
    '/login': showLogin,
    '/register': showRegister,
    '/create': showCreate,
    '/search': showSearch,
    '/logout': onLogout,
    '/detail': showDetail,
    '/edit': showEdit
};




const router = initialize(links);

router.goTo('/');
router.updateNav();

function onLogout() {
    logout();
    router.updateNav();
    router.goTo('/')
}




import { showHome } from "./views/home.js";
import { showCatalog } from "./views/catalog.js";
import { showLogin } from "./views/login.js";
import { showRegister } from "./views/register.js";
import { showDetails } from "./views/detail.js";
import { showCreate } from "./views/create.js";
import { initialize } from "./router.js";
import {logout} from './api/users.js'

document.getElementById('views').remove();

const links = {
'/':showHome,
'/catalog':showCatalog,
'/register':showRegister,
'/login':showLogin,
'/details':showDetails,
'/create':showCreate,
'/logout': onLogout
};

const router = initialize(links);
router.updateNav();

router.goTo('/');

function onLogout(){
    logout();
    router.updateNav();
    router.goTo('/')
}


function showSection(section) {

    main.replaceChildren(section);}

function onNavigate(event){
    let target = event.target;
    if(target.tagName=='IMG'){
        target = target.parentElement;
    }
     if(target.tagName =='A'){
        event.preventDefault();
        const url = new URL(target.href);
        goto(url.pathname);
     }
}

function goto(name){
    const handler = links[name]
        if(typeof handler == 'function'){
            handler(context);
        }
}
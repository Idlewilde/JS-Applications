import { elementsByUser } from "../api/data.js";
import { html, render } from '../../node_modules/lit-html/lit-html.js'

const section = document.getElementById('my-posts-page');
let user = null;

export async function profileView(){
    document.getElementById('main-content').replaceChildren(section);
    user = JSON.parse(localStorage.getItem('user'));
    const ads = await elementsByUser(user._id);

    section.innerHTML=`<h1 class="title">My Posts</h1>`;

    if(ads.length==0){section.innerHTML+=`<h1 class="title no-posts-title">You have no posts yet!</h1>`}
    else{
        let div = document.createElement('div');
        div.className='my-posts';
        section.appendChild(div);

        let cards = Array.from(ads).map(createCardPreview);
        Array.from(cards).forEach(e => {
        div.appendChild(e);
        });

    }
}

function createCardPreview(ad) {

    const element = document.createElement('div');
    element.className = 'post';

    let elementTemplate = (ad) => html`
    <h2 class="post-title">${ad.title}</h2>
                    <img class="post-image" src="${ad.imageUrl}" alt="Material Image">
                    <div class="btn-wrapper">
                        <a href="/details/${ad._id}" class="details-btn btn">Details</a>
                    </div>`
    render(elementTemplate(ad), element);
    return element;
}


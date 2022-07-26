import { allElements } from "../api/data.js";
import { html, render } from '../../node_modules/lit-html/lit-html.js'

const section = document.getElementById('dashboard-page');

export async function homeView(){
    document.getElementById('main-content').replaceChildren(section);
    section.innerHTML=`<h1 class="title">All Posts</h1>`;
    const ads = await allElements();
    if(ads.length==0){section.innerHTML+=`<h1 class="title no-posts-title">No posts yet!</h1>`}
    else{
        let div = document.createElement('div');
        div.className='all-posts';
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
                    </div>
    `
    render(elementTemplate(ad), element);
    return element;
}
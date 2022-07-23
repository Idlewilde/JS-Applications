
import { getNewGames } from "../api/data.js";
import { html, render } from '../../node_modules/lit-html/lit-html.js'

const section = document.getElementById('welcome-world');
const container = document.getElementById('home-page');
container.replaceChildren()

export async function homeView(){
    document.getElementById('main-content').replaceChildren(section);
    container.replaceChildren();
    const games = await getNewGames();
    const header=document.createElement('h1');
    header.textContent='Latest Games';
    container.appendChild(header);

    if(games.length==0){let elementTemplate = () => html`<p class="no-articles">No games yet</p>`
    render(elementTemplate(), container);}
    else{
        let cards = games.map(createCardPreview);
        Array.from(cards).forEach(e => {
            container.appendChild(e);
        });
    }
    

}

function createCardPreview(game) {

    const element = document.createElement('div');
    element.className = 'game';

    let elementTemplate = (game) => html` <div class="image-wrap">
    <img src="${game.imageUrl}">
</div>
<h3>${game.title}</h3>
<div class="rating">
    <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
</div>
<div class="data-buttons">
    <a href="/details/${game._id}" class="btn details-btn">Details</a>
</div>`
    render(elementTemplate(game), element);
    return element;
}
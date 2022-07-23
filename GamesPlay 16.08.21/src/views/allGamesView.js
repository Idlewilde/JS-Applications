
import { getAllGames } from "../api/data.js";
import { html, render } from '../../node_modules/lit-html/lit-html.js'

const section = document.getElementById('catalog-page');


export async function allGamesView(){
    document.getElementById('main-content').replaceChildren(section);
    section.replaceChildren();
    const games = await getAllGames();
    let header=document.createElement('h1');
    header.textContent='All Games';
    section.appendChild(header);
    if (games.length == 0) {
        let elementTemplate = () => html`<h3 class="no-articles">No articles yet</h3>`
        render(elementTemplate(), section);
    }
    else {
        let cards = games.map(createCardPreview);
        Array.from(cards).forEach(e => {
            section.appendChild(e);
        });
    }
}

function createCardPreview(game) {

    const element = document.createElement('div');
    element.className = 'allGames';

    let elementTemplate = (game) => html`
    <div class="allGames-info">
                    <img src="${game.imageUrl}">
                    <h6>${game.category}</h6>
                    <h2>${game.title}</h2>
                    <a href="/details/${game._id}" class="details-button">Details</a>
                </div>`
    render(elementTemplate(game), element);
    return element;
}
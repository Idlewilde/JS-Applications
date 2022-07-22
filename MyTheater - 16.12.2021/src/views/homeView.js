import { getAllTheaters } from "../api/data.js";
import { html, render } from '../../node_modules/lit-html/lit-html.js'

const homePage = document.getElementById('homePage');
const cardsContainer = document.getElementById('cardsContainer');

export async function homeView() {

    document.getElementById('content').replaceChildren(homePage);
    cardsContainer.replaceChildren();
    const theaters = await getAllTheaters();
 

    if (theaters.length == 0) {
        let elementTemplate = () => html`<h4 class="no-event">No Events Yet...</h4>`
        render(elementTemplate(), cardsContainer);
    }
    else {
        let cards = theaters.map(createCardPreview);
        Array.from(cards).forEach(e => {
            cardsContainer.appendChild(e);
        });
    }
}

function createCardPreview(theater) {

    const element = document.createElement('div');
    element.className = 'eventsInfo';

    let elementTemplate = (theater) => html`
    <div class="home-image">
        <img src="${theater.imageUrl}">
    </div>
    <div class="info">
        <h4 class="title">${theater.title}</h4>
        <h6 class="date">${theater.date}</h6>
        <h6 class="author">${theater.author}</h6>
        <div class="info-buttons">
            <a class="btn-details" href="/detail/${theater._id}">Details</a>
        </div>
    </div>`
    render(elementTemplate(theater), element);
    return element;
}
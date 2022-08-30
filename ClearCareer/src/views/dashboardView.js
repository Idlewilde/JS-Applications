import { allElements } from "../api/data.js";
import { html, render } from '../../node_modules/lit-html/lit-html.js'


const section = document.getElementById("dashboard");


export async function dashboardView() {
    document.getElementById('content').replaceChildren(section);
    section.replaceChildren();
    let header = () => html`<h2>Job Offers</h2>`
        render(header(), section);
    let elements = await allElements();
    if (elements.length == 0) {
        let noItemsTemplate = () => html`<h2>No offers yet.</h2>`
        render(noItemsTemplate(), section);
    } else {
        let cards = elements.map(createCardPreview);
        Array.from(cards).forEach(e => {
            section.appendChild(e);
        });
    }

}

function createCardPreview(card) {

    const element = document.createElement('div');
    element.className = 'offer';

    let elementTemplate = (card) => html`
    <img src="${card.imageUrl}" alt="example1" />
            <p>
              <strong>Title: </strong><span class="title">${card.title}</span>
            </p>
            <p><strong>Salary:</strong><span class="salary">${Number(card.salary)}</span></p>
            <a class="details-btn" href="/details/${card._id}">Details</a>
    `
    render(elementTemplate(card), element);
    return element;
}

import { deleteById, getById } from '../api/data.js';
import page from '../../node_modules/page/page.mjs';
import { html, render } from '../../node_modules/lit-html/lit-html.js'


const section = document.getElementById('listing-details');
let id = null;
let user = null;
const container = document.getElementById('details-info');


export async function detailsView(ctx) {
    document.getElementById('site-content').replaceChildren(section);
    id = ctx.params.id;
    user = JSON.parse(localStorage.getItem('user'));
    const car = await getById(id);
    const isOwner = user && user._id == car._ownerId;
    container.replaceChildren();

    let elementTemplate = (car) => html`
    <img src="${car.imageUrl}">
    <hr>
    <ul class="listing-props">
        <li><span>Brand:</span>${car.brand}</li>
        <li><span>Model:</span>${car.model}</li>
        <li><span>Year:</span>${car.year}</li>
        <li><span>Price:</span>${car.price}$</li>
    </ul>
    
    <p class="description-para">${car.description}</p>
    ${isOwner ? html`<div class="listings-buttons">
        <a href="/edit/${car._id}" class="button-list">Edit</a>
        <a href="/" class="button-list" @click=${remove}>Delete</a>
    </div>`
                : html``}`

    render(elementTemplate(car), container);
}

async function remove(event) {
    event.preventDefault();
    if (confirm("Do you really want to delete your listing?")) {
        await deleteById(id);
        page.redirect('/catalog');
    }

}
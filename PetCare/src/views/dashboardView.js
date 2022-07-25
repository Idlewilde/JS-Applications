import { allElements } from "../api/data.js";
import { html, render } from '../../node_modules/lit-html/lit-html.js'


const section = document.getElementById('dashboard');
const container = section.getElementsByClassName('animals-dashboard')[0];

export async function dashboardView(){
    document.getElementById('content').replaceChildren(section);
    container.replaceChildren();
    let pets = await allElements();
    if(pets.length==0){container.innerHTML=`<div>
    <p class="no-pets">No pets in dashboard</p>
</div>`}else{
    let cards = pets.map(createCardPreview);
    Array.from(cards).forEach(e => {
        container.appendChild(e);
    });
}

}

function createCardPreview(pet) {

    const element = document.createElement('div');
    element.className = 'animals-board';

    let elementTemplate = (pet) => html`<article class="service-img">
    <img class="animal-image-cover" src="${pet.image}">
</article>
<h2 class="name">${pet.name}</h2>
<h3 class="breed">${pet.breed}</h3>
<div class="action">
    <a class="btn" href="/details/${pet._id}">Details</a>
</div>`
    render(elementTemplate(pet), element);
    return element;
}
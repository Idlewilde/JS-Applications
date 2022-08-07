import { allElements } from "../api/data.js";
import { html, render } from '../../node_modules/lit-html/lit-html.js'


const section = document.getElementById('car-listings');
const container = document.getElementById('all-listings');

export async function catalogView(){
    document.getElementById('site-content').replaceChildren(section);
    container.replaceChildren();
    const cars = await allElements();

    if(cars.length==0){
        let noItemsTemplate = () => html`<p class="no-cars">No cars in database.</p>`
        render(noItemsTemplate(), container);
    }
    else{
        let cards = Array.from(cars).map(createCardPreview);
        Array.from(cards).forEach(e => {
        container.appendChild(e);
        });
    }
}

function createCardPreview(car) {

    const element = document.createElement('div');
    element.className = 'listing';

    let elementTemplate = (car) => html`<div class="preview">
    <img src="${car.imageUrl}">
</div>
<h2>${car.brand} ${car.model}</h2>
<div class="info">
    <div class="data-info">
        <h3>Year: ${car.year}</h3>
        <h3>Price: ${car.price} $</h3>
    </div>
    <div class="data-buttons">
        <a href="/details/${car._id}" class="button-carDetails">Details</a>
    </div>
</div>`
    render(elementTemplate(car), element);
    return element;
}
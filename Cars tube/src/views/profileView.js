import { elementsByUser } from "../api/data.js";
import { html, render } from '../../node_modules/lit-html/lit-html.js'

const section = document.getElementById('my-listings');
let container=document.getElementById('my-listings-container')
let user = null;

export async function profileView(){
    document.getElementById('site-content').replaceChildren(section);
    container.replaceChildren();
    user = JSON.parse(localStorage.getItem('user'));
    const cars = await elementsByUser(user._id);


    if(cars.length==0){
        let noItemsTemplate = () => html`<p class="no-cars"> You haven't listed any cars yet.</p>`
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

    let elementTemplate = (car) => html`
    <div class="preview">
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


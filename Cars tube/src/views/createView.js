import page from '../../node_modules/page/page.mjs'
import { create } from '../api/data.js';

const section = document.getElementById('create-listing');
const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);

export function createView(){
    document.getElementById('site-content').replaceChildren(section);
}

async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(form);

    const brand = formData.get('brand');
    const model = formData.get('model');
    const description = formData.get('description');
    let year = formData.get('year');
    const imageUrl = formData.get('imageUrl');
    let price = formData.get('price')



    if (brand.trim().length > 0
        &&model.trim().length > 0
        && description.trim().length > 0
        && imageUrl.trim().length > 0
        && year.trim().length > 0
        && price.trim().length > 0) {
            year=Number(year);
            price=Number(price);
        await create({
            brand,
            model,
            description,
            year,
            imageUrl,
            price
          }
           );
        form.reset();
        page.redirect('/catalog');
    }
}
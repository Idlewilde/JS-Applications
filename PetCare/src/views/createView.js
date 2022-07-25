import page from '../../node_modules/page/page.mjs'
import { create } from '../api/data.js';

const section = document.getElementById('createPage');
const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);

export function createView() {
    document.getElementById('content').replaceChildren(section);
}

async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(form);

    const name = formData.get('name');
    const breed = formData.get('breed');
    const age = formData.get('age');
    const weight = formData.get('weight')
    const image = formData.get('image');


    if (name.trim().length > 0
        && breed.trim().length > 0
        && age.trim().length > 0
        && weight.trim().length > 0
        && image.trim().length > 0) {

        await create({
            name,
            breed,
            age,
            weight,
            image} );
        form.reset();
        page.redirect('/');
    }
}
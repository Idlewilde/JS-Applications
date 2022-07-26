import page from '../../node_modules/page/page.mjs'
import { create } from '../api/data.js';

const section = document.getElementById('create-page');
const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);

export function createView(){
    document.getElementById('main-content').replaceChildren(section);
}

async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(form);

    const title = formData.get('title');
    const description = formData.get('description');
    const imageUrl = formData.get('imageUrl');
    const address = formData.get('address')
    const phone = formData.get('phone');


    if (title.trim().length > 0
        && description.trim().length > 0
        && imageUrl.trim().length > 0
        && address.trim().length > 0
        && phone.trim().length > 0) {

        await create({
            title,
            description,
            imageUrl,
            address,
            phone
          }
           );
        form.reset();
        page.redirect('/');
    }
}
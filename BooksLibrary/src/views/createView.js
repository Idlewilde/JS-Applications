import page from '../../node_modules/page/page.mjs'
import { create } from '../api/data.js';

const section = document.getElementById('create-page');
const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);

export function createView() {
    document.getElementById('site-content').replaceChildren(section);
}

async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(form);

    const title = formData.get('title');
    const description = formData.get('description');
    const imageUrl = formData.get('imageUrl')
    const type = formData.get('type');


    if (title.trim().length > 0
        && description.trim().length > 0
        && type.trim().length > 0
        && imageUrl.trim().length > 0) {

        await create({
            title,
            description,
            imageUrl,
            type
        }
        );
        form.reset();
        page.redirect('/');
    }
}
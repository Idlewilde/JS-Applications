import page from '../../node_modules/page/page.mjs'
import { create } from '../api/data.js';

const section = document.getElementById('create');
const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);

export function createView() {
    document.getElementById('content').replaceChildren(section);
}

async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(form);

    const title = formData.get('title');
    const imageUrl = formData.get('imageUrl');
    const description = formData.get('description');
    const requirements = formData.get('requirements');
    const salary = formData.get('salary');
    const category = formData.get('category');
   


    if (title.trim().length > 0
        && imageUrl.trim().length > 0
        && description.trim().length > 0
        &&requirements.trim().length > 0
        && category.trim().length > 0
        && salary.trim().length > 0) {

        await create({
            title,
            imageUrl, 
            category, 
            description, 
            requirements, 
            salary
          } );
        form.reset();
        page.redirect('/dashboard');
    }
}
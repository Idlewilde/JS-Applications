
import page from '../../node_modules/page/page.mjs'
import { createGame } from '../api/data.js';

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
    const category = formData.get('category');
    const summary = formData.get('summary');
    const imageUrl=formData.get('imageUrl')
    const maxLevel = formData.get('maxLevel');


    if (title.trim().length > 0
        && category.trim().length > 0
        && maxLevel.trim().length > 0
        && summary.trim().length > 0
        && imageUrl.trim().length > 0) {

        await createGame({
            title,
  category,
  maxLevel,
  imageUrl,
  summary
        }
        );
        form.reset();
        page.redirect('/');
    }
}
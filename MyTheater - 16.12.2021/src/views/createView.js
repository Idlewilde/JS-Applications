import page from '../../node_modules/page/page.mjs'
import { createTheater } from '../api/data.js';


const createPage = document.getElementById('createPage');
const form = createPage.querySelector('form');
form.addEventListener('submit', onSubmit);


export function createView(){
    document.getElementById('content').replaceChildren(createPage);
  
}

async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(form);

    const title = formData.get('title');
    const date = formData.get('date');
    const author = formData.get('author');
    const imageUrl=formData.get('imageUrl')
    const description = formData.get('description');


    if (title.trim().length > 0
        && date.trim().length > 0
        && author.trim().length > 0
        && description.trim().length > 0
        && imageUrl.trim().length > 0) {

        await createTheater({
            title,
            date,
            author,
            imageUrl,
            description
        }
        );
        form.reset();
        page.redirect('/');
    }
}
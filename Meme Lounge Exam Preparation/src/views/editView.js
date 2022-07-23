import page from '../../node_modules/page/page.mjs'
import { editById, getById } from '../api/data.js';
import { closeNotification } from '../app.js';

const section = document.getElementById('edit-meme');
const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);
let id=null;

export async function editView(ctx){
    id =ctx.params.id;
    document.getElementById('mainContent').replaceChildren(section);
    let meme = await getById(id);
    section.getElementsByClassName('title')[0].value = meme.title;
    section.getElementsByClassName('imageUrl')[0].value = meme.imageUrl;
    section.getElementsByClassName('description')[0].value = meme.description;
}



async function onSubmit(event){
    event.preventDefault();

    const formData = new FormData(form);

    const title = formData.get('title');
    const imageUrl = formData.get('imageUrl');
    const description = formData.get('description');

    if (title.trim().length > 0
        && imageUrl.trim().length > 0
        && description.trim().length > 0) {
        await editById(id, {
            title,
            description,
            imageUrl 
        }
        );
        form.reset();
        page.redirect(`/details/${id}`);
    }
    else{document.getElementById('error-message').textContent='All fields are required';
    document.getElementsByClassName('notification')[0].style.display='block';
    window.setTimeout(closeNotification, 3000);
}
}
import page from '../../node_modules/page/page.mjs'
import { create } from '../api/data.js';

const section = document.getElementById('create-meme');
const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);

export function createView(){
    document.getElementById('mainContent').replaceChildren(section);
}
async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(form);

    const title = formData.get('title');
    const imageUrl=formData.get('imageUrl')
    const description = formData.get('description');


    if (title.trim().length > 0
        && description.trim().length > 0
        && imageUrl.trim().length > 0) {

        await create({
            title,
            description,
            imageUrl,
        }
        );
        form.reset();
        page.redirect('/');
    }else{document.getElementById('error-message').textContent='All fields are required';
    document.getElementsByClassName('notification')[0].style.display='block';
    window.setTimeout(closeNotification, 3000);}
}
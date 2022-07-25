import page from '../../node_modules/page/page.mjs'
import { editById, getById } from '../api/data.js';

const section = document.getElementById('edit-page');
const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);
let id=null;


export async function editView(ctx){
    document.getElementById('site-content').replaceChildren(section);
    id=ctx.params.id;

    let book = await getById(id);
    section.getElementsByClassName('title')[0].value = book.title;
    section.getElementsByClassName('imageUrl')[0].value = book.imageUrl;
    section.getElementsByClassName('type')[0].value = book.type;
    section.getElementsByClassName('description')[0].value = book.description;

}

async function onSubmit(event){
    event.preventDefault();

    const formData = new FormData(form);

    const title = formData.get('title');
    const imageUrl = formData.get('imageUrl');
    const description = formData.get('description');
    const type = formData.get('type');

    if (title.trim().length > 0
        && imageUrl.trim().length > 0
        && description.trim().length > 0
        &&type.trim().length>0) {
        await editById(id, {
            title,
            description,
            imageUrl,
            type
        }
        );
        form.reset();
        page.redirect(`/details/${id}`);}
   
}
import page from '../../node_modules/page/page.mjs'
import { editById, getById } from '../api/data.js';

const editPage = document.getElementById('editPage');
const form = editPage.querySelector('form');
form.addEventListener('submit', onSubmit);
let id=null;

export async function editView(ctx){
    id =ctx.params.id;
    document.getElementById('content').replaceChildren(editPage);
    let theater = await getById(id);
    document.getElementsByClassName('titleValue')[0].value = theater.title;
    document.getElementsByClassName('dateValue')[0].value = theater.date;
    document.getElementsByClassName('authorValue')[0].value = theater.author;
    document.getElementsByClassName('imgValue')[0].value = theater.imageUrl;
    document.getElementsByClassName('descValue')[0].value = theater.description;
}



async function onSubmit(event){
    event.preventDefault();

    const formData = new FormData(form);

    const title = formData.get('title');
    const imageUrl = formData.get('imageUrl');
    const date = formData.get('date');
    const author = formData.get('author');
    const description = formData.get('description');

    if (title.trim().length > 0
        && imageUrl.trim().length > 0
        && date.trim().length > 0
        && author.trim().length > 0
        && description.trim().length > 0) {
        await editById(id, {
            title,
            date,
            author,
            description,
            imageUrl 
        }
        );
        form.reset();
        page.redirect(`/detail/${id}`);
    }
}

import page from '../../node_modules/page/page.mjs'
import { editById, getById } from '../api/data.js';

const section = document.getElementById('edit-page');
let id=null;
const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);
let user=null;

export async function editView(ctx){
    document.getElementById('main-content').replaceChildren(section);
    id=ctx.params.id;
    user = JSON.parse(localStorage.getItem('user'));

    let game = await getById(id);
    form.getElementsByClassName('title')[0].value = game.title;
    form.getElementsByClassName('category')[0].value = game.category;
    form.getElementsByClassName('summary')[0].value = game.summary;
    form.getElementsByClassName('maxLevel')[0].value = Number(game.maxLevel);
    form.getElementsByClassName('imageUrl')[0].value = game.imageUrl;
}

async function onSubmit(event){
    event.preventDefault();

    const formData = new FormData(form);
    const title = formData.get('title');
    const category = formData.get('category');
    const summary = formData.get('summary');
    const imageUrl=formData.get('imageUrl')
    const maxLevel = formData.get('maxLevel');


    if (title.trim().length > 0
        && category.trim().length > 0
        && maxLevel > 0
        && summary.trim().length > 0
        && imageUrl.trim().length > 0) {

        await editById(id,{
            title,
  category,
  maxLevel,
  imageUrl,
  summary
        }
        );
        form.reset();
        page.redirect(`/details/${id}`);
    }
}


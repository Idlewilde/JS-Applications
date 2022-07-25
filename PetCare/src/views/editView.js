import page from '../../node_modules/page/page.mjs'
import { editById, getById } from '../api/data.js';

const section = document.getElementById('editPage');
let id=null;
const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);
let user=null;

export async function editView(ctx){
    document.getElementById('content').replaceChildren(section);
    id=ctx.params.id;
    user = JSON.parse(localStorage.getItem('user'));
    let pet = await getById(id);
    section.getElementsByClassName('pet-name')[0].value = pet.name;
    section.getElementsByClassName('pet-breed')[0].value = pet.breed;
    section.getElementsByClassName('pet-age')[0].value = pet.age;
    section.getElementsByClassName('pet-weight')[0].value = pet.weight;
    section.getElementsByClassName('pet-image')[0].value = pet.image;
}

async function onSubmit(event){
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name');
    const breed = formData.get('breed');
    const age = formData.get('age');
    const weight = formData.get('weight')
    const image = formData.get('image');


    if (name.trim().length > 0
        && breed.trim().length > 0
        && age.trim().length > 0
        && weight.trim().length > 0
        && image.trim().length > 0) {

        await editById(id,{
            name,
            breed,
            age,
            weight,
            image}
        );
        form.reset();
        page.redirect(`/details/${id}`);
    }
}
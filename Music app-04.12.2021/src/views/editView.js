import { editById, getById } from "../api/data.js";

const section = document.getElementsByClassName('editPage')[0];
let ctx = null;
const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);
let currentId = null;

export async function showEdit(context, id) {
    const album = await getById(id);
    currentId = id;
    ctx = context;
    context.showSection(section);
    section.getElementsByClassName('name')[0].value = album.name;
    section.getElementsByClassName('imgUrl')[0].value = album.imgUrl;
    section.getElementsByClassName('price')[0].value = album.price;
    section.getElementsByClassName('releaseDate')[0].value = album.releaseDate;
    section.getElementsByClassName('artist')[0].value = album.artist;
    section.getElementsByClassName('genre')[0].value = album.genre;
    section.getElementsByClassName('description')[0].value = album.description;

}

async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(form);

    const name = formData.get('name');
    const imgUrl = formData.get('imgUrl');
    const price = formData.get('imgUrl');
    const releaseDate = formData.get('releaseDate');
    const artist = formData.get('artist');
    const genre = formData.get('genre');
    const description = formData.get('description');

    if (name.trim().length > 0
        && imgUrl.trim().length > 0
        && price.trim().length > 0
        && releaseDate.trim().length > 0
        && artist.trim().length > 0
        && genre.trim().length > 0
        && description.trim().length > 0) {
        await editById(currentId, {
            name,
            imgUrl,
            price,
            releaseDate,
            artist,
            genre,
            description
        }
        );
        form.reset();
        ctx.goTo('/detail', currentId)
    }


}
import { createAlbum } from "../api/data.js";

const section = document.getElementById('createPage');
let ctx = null;
const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);

export function showCreate(context) {
    ctx = context;
    context.showSection(section);

}

async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(form);

    const name = formData.get('name');
    const imgUrl = formData.get('imgUrl');
    const price = formData.get('price');
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

        await createAlbum({
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
        ctx.goTo('/catalog')
    }
}
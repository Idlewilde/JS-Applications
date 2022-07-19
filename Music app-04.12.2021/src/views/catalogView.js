import { getAllAlbums } from "../api/data.js";
import { showDetail } from "./detailView.js";
import { html, render } from '../../node_modules/lit-html/lit-html.js'


const section = document.getElementById('catalogPage');
let ctx = null;

export async function showCatalog(context) {
    ctx = context;
    context.showSection(section);
    const albums = await getAllAlbums();
    section.innerHTML = '';

    if (albums.length == 0) { section.innerHTML = '<p>No Albums in Catalog!</p>' }
    else {
        let elementTemplate = () => html`<h1>All albums</h1>`
        render(elementTemplate(), section);
        let cards = albums.map(createAlbumPreview);
        Array.from(cards).forEach(e => {
            section.appendChild(e);
        });
    }
}

function createAlbumPreview(album) {

    const element = document.createElement('div');
    element.className = 'card-box';
    let isLogged = localStorage.getItem('user') != null;

    let elementTemplate = (album) => html`<img src="${album.imgUrl}">
<div>
    <div class="text-center">
        <p class="name">Name: ${album.name}</p>
        <p class="artist">Artist: ${album.artist}</p>
        <p class="genre">Genre: ${album.genre}</p>
        <p class="price">Price: $${album.price}</p>
        <p class="date">Release Date: ${album.releaseDate}</p>
    </div>
    ${isLogged ? html`<div class="btn-group" id=${album._id}>
        <a href="/details" id="details" @click=${onDetailsSelect}>Details</a>
    </div>`: html``}
</div>`
    render(elementTemplate(album), element);
    return element;
}

function onDetailsSelect(event) {
    event.preventDefault();
    const id = event.target.parentNode.id;
    console.log(id)
    if (id) {
        ctx.goTo('/detail', id);
    }
}





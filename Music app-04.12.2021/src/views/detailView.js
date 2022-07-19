import { deleteById, getById } from "../api/data.js";
import { html, render } from '../../node_modules/lit-html/lit-html.js'

let ctx = null;

const section = document.getElementById('detailsPage');

export async function showDetail(context, id) {
    const album = await getById(id);
    ctx = context;
    context.showSection(section);

    const user = JSON.parse(localStorage.getItem('user'));
    const isOwner = user && user._id == album._ownerId;

    let elementTemplate = (album) => html`<div class="wrapper">
    <div class="albumCover">
        <img src="${album.imgUrl}">
    </div>
    <div class="albumInfo">
        <div class="albumText">

            <h1>Name: ${album.name}</h1>
            <h3>Artist: ${album.artist}</h3>
            <h4>Genre: ${album.genre}</h4>
            <h4>Price: $${album.price}</h4>
            <h4>Date: ${album.releaseDate}</h4>
            <p>Description: ${album.description}</p>
        </div>
        ${isOwner ? html`<div class=actionBtn><a href="/edit" class="edit" @click=${editAlbum}>Edit</a>
            <a href="/" class="remove" @click=${removeAlbum}>Delete</a></div>` : html``}
    </div>
</div>`;

    render(elementTemplate(album), section);

    function removeAlbum(event) {
        event.preventDefault();
        let result = confirm("Want to delete?");
        if (result) {
            deleteById(id);
            ctx.goTo('/catalog');
        }

    }

    function editAlbum(event) {
        event.preventDefault();
        ctx.goTo('/edit', id)
    }

}








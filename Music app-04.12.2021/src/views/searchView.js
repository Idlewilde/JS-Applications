import { getFilteredAlbums } from "../api/data.js";
import { html, render } from '../../node_modules/lit-html/lit-html.js'


const section = document.getElementById('searchPage');
let ctx = null;

export async function showSearch(context) {
    ctx = context;
    context.showSection(section);
    section.getElementsByTagName('button')[0].addEventListener('click', displayResults);

    async function displayResults(event) {
        event.preventDefault();
        let searchWord = document.getElementById('search-input').value;
        const results = await getFilteredAlbums(searchWord);

        let resultArea = section.getElementsByClassName('search-result')[0];
        resultArea.innerHTML = '';
        if (results.length == 0) { resultArea.innerHTML = `<p class="no-result">No result.</p>` }
        else {
            let cards = results.map(createSearchPreview);
            Array.from(cards).forEach(e => {
                resultArea.appendChild(e);
            });

            function createSearchPreview(album) {

                const element = document.createElement('div');
                element.className = 'card-box';
                const isLogged = localStorage.getItem('user') != null;
                let elementTemplate = (album) => html`<img src="${album.imgUrl}">
<div>
    <div class="text-center">
        <p class="name">Name: ${album.name}</p>
        <p class="artist">Artist: ${album.artist}</p>
        <p class="genre">Genre: ${album.genre}</p>
        <p class="price">Price: ${album.price}</p>
        <p class="date">Release Date: ${album.releaseDate}</p>
    </div>
    ${isLogged ? html`<div class="btn-group">
        <a href="/details" id="${album._id}" @click=${onDetailsSelect}>Details</a>
    </div>`: html``}
</div>`

                render(elementTemplate(album), element);
                return element;
            }
        }
    }
}

function onDetailsSelect(event) {
    event.preventDefault();
    const id = event.target.id;
    if (id) {
        ctx.goTo('/detail', id);
    }
}
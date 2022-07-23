import { getAll } from "../api/data.js";
import { html, render } from '../../node_modules/lit-html/lit-html.js'

const section = document.getElementById('meme-feed');
const container = document.getElementById('memes');

export async function allMemesView(){
    document.getElementById('mainContent').replaceChildren(section);

    container.replaceChildren();
    const memes = await getAll();
 

    if (memes.length == 0) {
        let elementTemplate = () => html`<p class="no-memes">No memes in database.</p>`
        render(elementTemplate(), container);
    }
    else {
        let cards = memes.map(createCardPreview);
        Array.from(cards).forEach(e => {
            container.appendChild(e);
        });
    }

}

function createCardPreview(meme) {

    const element = document.createElement('div');
    element.className = 'meme';

    let elementTemplate = (meme) => html`
    <div class="card">
                        <div class="info">
                            <p class="meme-title">${meme.title}</p>
                            <img class="meme-image" alt="meme-img" src="${meme.imageUrl}">
                        </div>
                        <div id="data-buttons">
                            <a class="button" href="/details/${meme._id}">Details</a>
                        </div>
                    </div>`
    render(elementTemplate(meme), element);
    return element;
}

import { html, render } from '../../node_modules/lit-html/lit-html.js'
import { deleteById, getById} from '../api/data.js';
import page from '../../node_modules/page/page.mjs'

let id=null;
let user=null;
const section = document.getElementById('meme-details');

export async function detailsView(ctx){
    document.getElementById('mainContent').replaceChildren(section);
    id=ctx.params.id;
    user = JSON.parse(localStorage.getItem('user'));
    const meme = await getById(id);
    const isOwner = user && user._id == meme._ownerId;
    
    let elementTemplate=(meme)=>html`<h1>Meme Title: ${meme.title}</h1>
    <div class="meme-details">
        <div class="meme-img">
            <img alt="meme-alt" src="${meme.imageUrl}">
        </div>
        <div class="meme-description">
            <h2>Meme Description</h2>
            <p>${meme.description}
            </p>
            ${isOwner ? html`<a class="button warning" href="/edit/${meme._id}">Edit</a>
            <button class="button danger" @click=${removeElement}>Delete</button>`
        :html``}`

render(elementTemplate(meme), section);
        }

        async function removeElement(event){
            event.preventDefault();
            await deleteById(id);
            page.redirect('/allMemes');
        }
        

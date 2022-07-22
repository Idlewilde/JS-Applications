
import { html, render } from '../../node_modules/lit-html/lit-html.js'
import { deleteById, getById, getLikes, getLikesByUser, likeTheater } from '../api/data.js';
import page from '../../node_modules/page/page.mjs'

const detailPage = document.getElementById('detailsPage');
let id=null;
let user=null;
let likes=null;



export async function detailView(ctx) {
    id=ctx.params.id
    document.getElementById('content').replaceChildren(detailPage);
     user = JSON.parse(localStorage.getItem('user'));
    let countByUser = await getLikesByUser(id,user._id);
    
    const theater = await getById(id);
    const isOwner = user && user._id == theater._ownerId;
    likes = await getLikes(id);
   
  
    const container=document.getElementById('detailsBox');
    let elementTemplate = (theater) => html` <div class="detailsInfo">
    <h1>Title: ${theater.title}</h1>
    <div>
        <img src="${theater.imageUrl}" />
    </div>
</div>

<div class="details">
    <h3>Theater Description</h3>
    <p>${theater.description}</p>
    <h4>Date: ${theater.date}</h4>
    <h4>Author: ${theater.author}</h4>

    <div class="buttons">
    ${isOwner ? html`
        <a class="btn-delete" href="/" @click=${removeAlbum}>Delete</a>
        <a class="btn-edit" href="/edit/${id}">Edit</a>`
        :html`
        <a class="btn-like" id = 'btn-like' href="/detail/${id}">Like</a>`}
    </div>
    <p class="likes" id="plikes"></p>
</div>`

render(elementTemplate(theater), container);

document.getElementById('plikes').textContent=`Likes: ${likes}`;

if(user==null||countByUser>0){document.getElementById('btn-like').style.display='none'}
else{document.getElementById('btn-like').style.display='block'}

async function removeAlbum(event){
    event.preventDefault();
    await deleteById(ctx.params.id);
    page.redirect('/profile');
}

let button = document.getElementById('btn-like');
button.addEventListener('click',toggleLike)
}



async function toggleLike(event){
    event.preventDefault();
    document.getElementById('btn-like').style.display='none'
    await likeTheater({'theaterId':id});
    let text = document.getElementById('plikes').textContent;
    let countLikes=Number(text[text.length-1])+1;
    document.getElementById('plikes').textContent=`Likes: ${countLikes}`;
    }
   





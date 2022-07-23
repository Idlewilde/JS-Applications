
import { html, render } from '../../node_modules/lit-html/lit-html.js'
import { deleteById, getById, getComment, postComment} from '../api/data.js';
import page from '../../node_modules/page/page.mjs'

const section = document.getElementById('game-details');
let id=null;
let user=null;
const container = document.getElementById('info-section-details');
const commentForm=document.getElementById('create-comment');
const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);
let noComments =null;
let ul=null;

export async function detailsView(ctx){
    document.getElementById('main-content').replaceChildren(section);
    id=ctx.params.id;
    const game = await getById(id);
    user = JSON.parse(localStorage.getItem('user'));
    container.replaceChildren();
    const isOwner = user && user._id == game._ownerId;
    const loggedButNoOwner= user && user._id != game._ownerId;
    const comments = await getComment(id);

    container.innerHTML=`<div class="game-header">
    <img class="game-img" src="${game.imageUrl}">
    <h1>${game.title}</h1>
    <span class="levels">MaxLevel: ${game.maxLevel}</span>
    <p class="type">${game.category}</p></div>
<p class="text">
    ${game.summary}</p>
<div class="details-comments" id="comments-container">
                    <h2>Comments:</h2>
                    <ul id=comsList></ul>
                    <p class="no-comment" id="no-comments"></p>
                </div>`
noComments=document.getElementById('no-comments');
if(comments.length==0){noComments.textContent='No comments.'}

 ul = document.getElementById('comsList');

ul.innerHTML='';
Array.from(comments).forEach(e=>ul.innerHTML+=`<li class="comment">
<p>Content: ${e.comment}</p>
</li>`);

if(isOwner){container.innerHTML+=`<div class="buttons">
<a href="/edit/${id}" class="button">Edit</a>
<a href="/" class="button" id='del-btn'>Delete</a>
</div>`;document.getElementById('del-btn').addEventListener('click',removeGame)}

if(loggedButNoOwner){commentForm.style.display='block'}
else{commentForm.style.display='none'}
}


async function removeGame(event){
    event.preventDefault();
    await deleteById(id);
    page.redirect('/');
}

async function onSubmit(event){
    event.preventDefault();
    const formData = new FormData(form);
    const comment = formData.get('comment');
    await postComment({'gameId':id,'comment':comment});
    ul.innerHTML='';
    noComments.textContent='';
    let newComments = await getComment(id);
    Array.from(newComments).forEach(e=>ul.innerHTML+=`<li class="comment">
<p>Content: ${e.comment}</p>
</li>`);
form.reset();




}
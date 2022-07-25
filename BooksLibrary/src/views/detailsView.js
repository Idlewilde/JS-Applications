import { html, render } from '../../node_modules/lit-html/lit-html.js'
import { deleteById, getById, like, getLikes, getLikesByUser } from '../api/data.js';
import page from '../../node_modules/page/page.mjs'


const section = document.getElementById('details-page');
let id = null;
let user = null;
let likes = null;



export async function detailsView(ctx) {
    document.getElementById('site-content').replaceChildren(section);
    id = ctx.params.id;
    user = JSON.parse(localStorage.getItem('user'));
    const bookInfo = await getById(id);
    likes = await getLikes(id)
    const isOwner = user && user._id == bookInfo._ownerId;
    let loggedButNoOwner=false;
    if(user!=null){
    const likeByCurrentUser = await getLikesByUser(id, user._id);
    loggedButNoOwner = user._id != bookInfo._ownerId && Number(likeByCurrentUser) == 0;}

    const book = { 'title': bookInfo.title, 'imageUrl': bookInfo.imageUrl, 'description': bookInfo.description, 'type': bookInfo.type, 'likes': Number(likes) }

    let elementTemplate = (book) => html`
    <div class="book-information">
        <h3>${book.title}</h3>
        <p class="type">Type: ${book.type}</p>
        <p class="img"><img src="${book.imageUrl}"></p>
        <div class="actions">
            ${isOwner ? html`<a class="button" href="/edit/${id}">Edit</a>
            <a class="button" href="/" @click=${remove}>Delete</a>` : html``}
            ${loggedButNoOwner ? html`<a class="button" href="/detail/${id}" @click=${likeBook}>Like</a>` : html``}
            <div class="likes">
                <img class="hearts" src="/images/heart.png">
                <span id="total-likes">Likes: ${book.likes}</span>
            </div>
        </div>
    </div>
    <div class="book-description">
        <h3>Description:</h3>
        <p>${book.description}</p>
    </div>`

    render(elementTemplate(book), section);
}

async function remove(event) {
    event.preventDefault();
    await deleteById(id);
    page.redirect('/');
}

async function likeBook(event) {
    event.preventDefault();
    await like({ 'bookId': id });
    event.target.style.display = 'none';
    document.getElementById('total-likes').textContent = `Likes: ${Number(likes) + 1}`
}
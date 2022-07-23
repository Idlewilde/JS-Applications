import { getByUser } from "../api/data.js";
import page from '../../node_modules/page/page.mjs'
import { html, render } from '../../node_modules/lit-html/lit-html.js'


const section = document.getElementById('user-profile-page');
let user = null;
const userInfo = document.getElementsByClassName('user-info')[0];
const userListing = document.getElementsByClassName('user-meme-listings')[0];


export async function profileView(){
    document.getElementById('mainContent').replaceChildren(section);
    user = JSON.parse(localStorage.getItem('user'));
    const memes = await getByUser(user._id);
    let info = {
        'username':user.username,
        'email':user.email,
        'gender':user.gender,
        'count':memes.length
    }
    const userInfoElement = (info) => html`<img id="user-avatar-url" alt="user-profile" src="/images/${info.gender}.png">
    <div class="user-content">
        <p>Username: ${info.username}</p>
        <p>Email: ${info.email}</p>
        <p>My memes count: ${info.count}</p>
    </div>`
      render(userInfoElement(info), userInfo);

      if(memes.length==0){userListing.innerHTML='<p class="no-memes">No memes in database.</p>'}
      else{
        userListing.replaceChildren();
        let cards = memes.map(createCardPreview);
             Array.from(cards).forEach(e => {
                userListing.appendChild(e);
             });
      }
}

function createCardPreview(meme) {
    
    const element = document.createElement('div');
    element.className = 'user-meme';

    let elementTemplate = (meme) => html`<p class="user-meme-title">${meme.title}</p>
    <img class="userProfileImage" alt="meme-img" src="${meme.imageUrl}">
    <a class="button" href="/details/${meme._id}">Details</a>`
    render(elementTemplate(meme), element);
    return element;
}
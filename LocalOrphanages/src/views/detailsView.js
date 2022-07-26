
import { deleteById, getById, getDonations, donate, getDonationsByUser } from '../api/data.js';
import page from '../../node_modules/page/page.mjs'

const section = document.getElementById('details-page');
let id = null;
let user = null;
let donations = null;

export async function detailsView(ctx){
    document.getElementById('main-content').replaceChildren(section);
    id = ctx.params.id;
    user = JSON.parse(localStorage.getItem('user'));
    const ad = await getById(id);
    donations = await getDonations(id);
    const isOwner = user && user._id == ad._ownerId;
    let loggedButNoOwner=false;
    if(user!=null){
        const donationsByCurrentUser = await getDonationsByUser(id, user._id);
        loggedButNoOwner = user._id != ad._ownerId && Number(donationsByCurrentUser) == 0;}
    const container = document.getElementById('details');
    container.innerHTML=`<div class="image-wrapper">
    <img src="${ad.imageUrl}" alt="Material Image" class="post-image">
</div>
<div class="info">
    <h2 class="title post-title">${ad.title}</h2>
    <p class="post-description">Description: ${ad.description}</p>
    <p class="post-address">Address: ${ad.address}</p>
    <p class="post-number">Phone number: ${ad.phone}</p>
    <p class="donate-Item" id='donate-count'>Donate Materials: ${donations}</p>
    <div class="btns" id="btns-div">
    </div>
</div>`

const btns = document.getElementById('btns-div');

if(isOwner){btns.innerHTML=`<a href="/edit/${id}" class="edit-btn btn">Edit</a>
<a href="/delete" class="delete-btn btn" id='delete-btn'>Delete</a>`;
document.getElementById('delete-btn').addEventListener('click',remove)}
if(loggedButNoOwner){btns.innerHTML=`<a href="/details/${id}" class="donate-btn btn" id='donate-btn'>Donate</a>`;
document.getElementById('donate-btn').addEventListener('click',donateGoods)}
  
}

async function remove(event) {
    event.preventDefault();
    if (confirm("Do you really want to delete your post?")) {
        await deleteById(id);
        page.redirect('/');
    }
  
}

async function donateGoods(event){
    event.preventDefault();
    await donate({'postId': id})
    donations=Number(donations)+1;
    document.getElementById('donate-count').textContent=`Donate Materials: ${donations}`
    event.target.style.display='none'
}


import { html, render } from '../../node_modules/lit-html/lit-html.js'
import { deleteById, getById, getDonations, donate, getDonationsByUser } from '../api/data.js';
import page from '../../node_modules/page/page.mjs'

const section = document.getElementById('detailsPage');
let id = null;
let user = null;
const container = section.getElementsByClassName('details')[0];
let donations = 0;

export async function detailsView(ctx) {
    document.getElementById('content').replaceChildren(section);
    id = ctx.params.id;
    user = JSON.parse(localStorage.getItem('user'));
    let pet = await getById(id);
    
    const isOwner = user && user._id == pet._ownerId;
    const loggedButNoOwner = user && user._id != pet._ownerId;
    const donationsByUser = await getDonationsByUser(id,user._id);
    donations = await getDonations(id);
    container.innerHTML = ``;
    container.innerHTML = `<div class="animalPic">
    <img src="${pet.image}">
</div>
<div>
    <div class="animalInfo">
        <h1>Name: ${pet.name}</h1>
        <h3>Breed: ${pet.breed}</h3>
        <h4>Age: ${pet.age}</h4>
        <h4>Weight: ${pet.weight}</h4>
        <h4 class="donation" id='sum-donations'>Donation: ${Number(donations)*100}$</h4>
    </div>
    <div class="actionBtn" id="buttons">
    </div>
</div>`

    if (isOwner) {
        document.getElementById('buttons').innerHTML += 
        `<a href="/edit/${id}" class="edit">Edit</a>
        <a href="/" class="remove" id="delete-btn">Delete</a>`; 
        document.getElementById('delete-btn').addEventListener('click', remove);
    }
   else if (loggedButNoOwner&&Number(donationsByUser)==0) {
        document.getElementById('buttons').innerHTML +=
         `<a href="/" class="donate" id="donate-btn">Donate</a>`
        document.getElementById('donate-btn').addEventListener('click', donateMoney);
    }
}

async function remove(event){
    event.preventDefault();
    await deleteById(id);
    page.redirect('/');
}

async function donateMoney(event){
    event.preventDefault();
    await donate({'petId': id})
    donations=Number(donations)*100+100;
    document.getElementById('sum-donations').textContent=`Donation: ${donations}$`
    event.target.style.display='none';
  
}
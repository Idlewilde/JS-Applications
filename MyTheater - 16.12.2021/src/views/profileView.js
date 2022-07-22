
import { getTheatersByUser } from "../api/data.js";
import page from '../../node_modules/page/page.mjs'
import { html, render } from '../../node_modules/lit-html/lit-html.js'

const profilePage = document.getElementById('profilePage');
const eventsByProfileContainer = document.getElementById('eventsByProfileContainer');

export async function profileView(){
    
    document.getElementById('content').replaceChildren(profilePage);
    let user = JSON.parse(localStorage.getItem('user'));
    document.getElementById('emailProfile').textContent=user.email;
    let theaters = await getTheatersByUser(user._id);
   if(theaters.length>0){
   eventsByProfileContainer.replaceChildren();
   let cards = theaters.map(createCardPreview);
        Array.from(cards).forEach(e => {
            eventsByProfileContainer.appendChild(e);
        });
}else{eventsByProfileContainer.innerHTML=
    '<div class="no-events" id="no-events"><p>This user has no events yet!</p></div>';}
    
}



function createCardPreview(theater) {
    
    const element = document.createElement('div');
    element.className = 'eventBoard';

    let elementTemplate = (theater) => html`<div class="event-info">
                        <img src="${theater.imageUrl}">
                        <h2>${theater.title}</h2>
                        <h6>${theater.date}</h6>
                        <a href="/detail/${theater._id}" class="details-button">Details</a></div>`
    render(elementTemplate(theater), element);
    return element;
}
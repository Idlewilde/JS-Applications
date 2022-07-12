import { html, render } from "../node_modules/lit-html/lit-html.js";
import { cats } from "./catSeeder.js";

let catCards = (cats) => html`
<ul>
  ${cats.map((cat) => html`<li><img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
                <div class="info">
                    <button class="showBtn">Show status code</button>
                    <div class="status" style="display: none" id="${cat.id}">
                        <h4>Status Code: ${cat.statusCode}</h4>
                        <p>${cat.statusMessage}</p>
                    </div>
                </div></li>`)}
</ul>`;

render(catCards(cats), document.getElementById('allCats'));

let buttons = document.getElementsByClassName('showBtn');


Array.from(buttons).forEach(element => {
  element.addEventListener('click',showInfo)});

function showInfo(event){
    if(event.target.textContent=='Show status code'){
        event.target.textContent=='Hide status code';
        event.target.parentNode.children[1].style.display='block';}
    else{
        event.target.textContent=='Show status code';
        event.target.parentNode.children[1].style.display='none';
    }
}





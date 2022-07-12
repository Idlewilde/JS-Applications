import { html, render } from "../node_modules/lit-html/lit-html.js";
//import {html, render} from 'https://unpkg.com/lit-html?module';


let townsInfo = document.getElementById('towns');




document.getElementById('btnLoadTowns').addEventListener('click', renderTowns);

function renderTowns(event){
    event.preventDefault();
    let towns = townsInfo.value.split(', ');
    let elements = (towns) => html`
<ul>
  ${towns.map((town) => html`<li>${town}</li>`)}
</ul>`;
render(elements(towns), document.getElementById('root'));} 





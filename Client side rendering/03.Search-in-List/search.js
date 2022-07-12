import { towns } from "./towns.js";
import { html, render } from "../node_modules/lit-html/lit-html.js";
import { classMap } from '../node_modules/lit-html/directives/class-map.js';



 function search() {

   let elements = (list) => html`
   <ul>
     ${list.map((item) => html`<li>${item}</li>`)}
   </ul>`;

render(elements(towns), document.getElementById('towns'));

document.querySelector('button').addEventListener('click',searchResults);

function searchResults(event){
let searched = document.getElementById('searchText').value.toLowerCase();

let result = 0;
for(let i = 0; i<towns.length; i++){
   if(towns[i].toLowerCase().includes(searched)){result++}
};

Array.from(document.getElementById('towns').children[0].children).forEach((element)=>{
   if(element.textContent.toLowerCase().includes(searched)){element.classList.add('active')}
})
document.getElementById('result').textContent=`${result} matches found`

}

}

search();









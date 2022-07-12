import { html, render } from "../node_modules/lit-html/lit-html.js";

async function solve() {
   async function loadItems(){
      const res = await fetch('http://localhost:3030/jsonstore/advanced/table');
      const data = await res.json();
      return data;
     }
     let data =  await loadItems();
     let info = Object.values(data);
     
   let elements = (students) => html`
   ${students.map((student) => html`<tr><td>${student.firstName} ${student.lastName}</td>
   <td>${student.email}</td><td>${student.course}</td></tr>`)}`;


render(elements(info), document.querySelector('tbody'));


   document.querySelector('#searchBtn').addEventListener('click', onClick);

   function onClick() {

      let search = document.getElementById('searchField').value.toLowerCase();
      let rows = Array.from(document.querySelector('tbody').children);

      rows.forEach((row)=>{
         row.classList.remove('select');
      });

      for(let i = 0; i<rows.length;i++){
         let cells =Array.from(rows[i].children);
         if(cells[0].textContent.toLowerCase().includes(search)||
         cells[1].textContent.toLowerCase().includes(search)||
         cells[2].textContent.toLowerCase().includes(search)){rows[i].classList.add('select')}
      }


   }
}

solve()
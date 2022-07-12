import { html, render } from "../node_modules/lit-html/lit-html.js";

async function addItem() {
    async function displayData(){
   async function loadItems(){
    const res = await fetch('http://localhost:3030/jsonstore/advanced/dropdown');
    const data = await res.json();
    return data;
   }
   let data =  await loadItems();
   let info =Object.values(data);
 let elements = (towns) => html`
${towns.map((town) => html`<option value = "${town._id}">${town.text}</option>`)}`;
render(elements(info), document.getElementById('menu'));}

displayData();

const form = document.querySelector('form');
const formData=new FormData(form);
form.addEventListener('submit',onSubmit);

async function onSubmit(event){
    event.preventDefault();
    const text = document.getElementById('itemText').value;

    await fetch('http://localhost:3030/jsonstore/advanced/dropdown',{
        method: 'POST',
        headers:{
                'Content-Type': 'application/json'},
                body:JSON.stringify({text})
        
    });

    displayData()

    
}




}




   



addItem()


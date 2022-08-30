import { html, render } from '../../node_modules/lit-html/lit-html.js'
import { deleteById, getById } from '../api/data.js';
import page from '../../node_modules/page/page.mjs'

import { getExtra, extra, getExtraByUser } from '../api/data.js';
let applications = 0;
const section = document.getElementById('details');
const container = document.getElementById('details-wrapper');
let id = null;
let user = null;

export async function detailsView(ctx) {
    document.getElementById('content').replaceChildren(section);
    id = ctx.params.id;
    user = JSON.parse(localStorage.getItem('user'));
    let element = await getById(id);
    let isOwner=false;
    let loggedButNoOwner=false;
    let extraByUser=0;

    if(user){
    isOwner = user && user._id == element._ownerId;
    loggedButNoOwner = user && user._id != element._ownerId;
    extraByUser = await getExtraByUser(id,user._id);}

    applications = await getExtra(id);

    let elementTemplate=(element)=>html`<img id="details-img" src="${element.imageUrl}" alt="example1" />
    <p id="details-title">${element.title}</p>
    <p id="details-category">
      Category: <span id="categories">${element.category}</span>
    </p>
    <p id="details-salary">
      Salary: <span id="salary-number">${Number(element.salary)}</span>
    </p>
    <div id="info-wrapper">
      <div id="details-description">
        <h4>Description</h4>
        <span>${element.description}</span
        >
      </div>
      <div id="details-requirements">
        <h4>Requirements</h4>
        <span>${element.requirements}</span
        >
      </div>
    </div>
    <p>Applications: <strong id="applications">${Number(applications)}</strong></p>
    <div id="action-buttons">
    ${isOwner ? html`<a href="/edit/${id}" id="edit-btn">Edit</a>
      <a href="/" id="delete-btn" @click=${remove}>Delete</a>`:html``}
    ${loggedButNoOwner&&extraByUser==0 ?html`<a href="" id="apply-btn" @click=${extraAction}>Apply</a>`:html``}
    </div>
    `

render(elementTemplate(element), container);
}

async function remove(event){
    event.preventDefault();
    await deleteById(id);
    page.redirect('/dashboard');
}

async function extraAction(event){
    event.preventDefault();
    document.getElementById('apply-btn').style.display='none';
    let offerId = id;
    await extra({offerId})
    applications=Number(applications)+1;
    document.getElementById('applications').textContent=`${Number(applications)}`
    
  
}
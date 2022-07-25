import { allElements } from "../api/data.js";
import { html, render } from '../../node_modules/lit-html/lit-html.js'


const section = document.getElementById('dashboard-page');


export async function homeView(){
    document.getElementById('site-content').replaceChildren(section);
    section.replaceChildren();
    section.innerHTML=`<h1>Dashboard</h1>`
    const books = await allElements();
    if(books.length==0){section.innerHTML+=`<p class="no-books">No books in database!</p>`}
    else{let ul = document.createElement('ul');
    ul.className='other-books-list';
    section.appendChild(ul);

      
        let cards = Array.from(books).map(createCardPreview);
        Array.from(cards).forEach(e => {
            ul.appendChild(e);
        });
    }

}

function createCardPreview(book) {

    const element = document.createElement('li');
    element.className = 'otherBooks';

    let elementTemplate = (book) => html` <h3>${book.title}</h3>
    <p>Type: ${book.type}</p>
    <p class="img"><img src="${book.imageUrl}"></p>
    <a class="button" href="/details/${book._id}">Details</a>`
    render(elementTemplate(book), element);
    return element;
}
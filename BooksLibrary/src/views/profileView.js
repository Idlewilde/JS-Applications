import { elementsByUser } from "../api/data.js";
import page from '../../node_modules/page/page.mjs'
import { html, render } from '../../node_modules/lit-html/lit-html.js'

const section = document.getElementById('my-books-page');
let user = null;

export async function profileView(){
    document.getElementById('site-content').replaceChildren(section);
    user = JSON.parse(localStorage.getItem('user'));
    const books = await elementsByUser(user._id);
    section.replaceChildren();
    if(books.length==0){
        section.innerHTML=`<h1>My Books</h1>
        <p class="no-books">No books in database!</p>`
    }
    else{
        const elementTemplate = () => html`
        <h1>My Books</h1>`
          render(elementTemplate(), section);
          let ul = document.createElement('ul');
          ul.className='my-books-list';
          section.appendChild(ul);
              let cards = Array.from(books).map(createCardPreview);
              Array.from(cards).forEach(e => {
                  ul.appendChild(e);
              });
    }

    function createCardPreview(book) {

        const element = document.createElement('li');
        element.className = 'otherBooks';
    
        let elementTemplate = (book) => html`  <h3>${book.title}</h3>
        <p>Type: ${book.type}</p>
        <p class="img"><img src="${book.imageUrl}"></p>
        <a class="button" href="/details/${book._id}">Details</a>`
        render(elementTemplate(book), element);
        return element;
    }
}


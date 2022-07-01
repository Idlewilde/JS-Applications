import { showView } from "./util.js";
import { getMovie } from "./details.js";
import { homePage } from "./home.js";


const section = document.querySelector('#edit-movie')
const form = section.querySelector('form');

export function editPage(){
    showView(section);
}

export async function editMovie(e, movieId){
    e.preventDefault();
    showView(section);
    let movie = await getMovie(movieId);
    console.log(movie);
    document.getElementById('title-edit').value=movie.title;
    document.getElementById('description-edit').value=movie.description;
    document.getElementById('imageUrl-edit').value=movie.img;
    
    form.addEventListener('submit',(e) => editMovieInfo(e, movieId));

};

async function editMovieInfo(e,movieId){
    e.preventDefault();
    
    const user = JSON.parse(localStorage.getItem('user'));
    
    let title = document.getElementById('title-edit').value;
    let description=document.getElementById('description-edit').value;
    let img = document.getElementById('imageUrl-edit').value;

   

    await fetch(`http://localhost:3030/data/movies/${movieId}`,{
        method: 'PUT',
        headers:{
                'Content-Type': 'application/json',
                'X-Authorization':user.accessToken},
                body:JSON.stringify({title,description,img})
        
            });
            homePage();
        }


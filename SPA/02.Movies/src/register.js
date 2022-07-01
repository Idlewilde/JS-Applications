import { showView } from "./util.js";
import { homePage } from "./home.js";
import { updateNav } from "./util.js";

const section = document.querySelector('#form-sign-up');
const form = section.querySelector('form');
form.addEventListener('submit',onSubmit)

export function registerPage(){
    showView(section);
}

async function onSubmit(event){
    event.preventDefault();
    const formData = new FormData(form);
    const email = formData.get('email');
    const password =formData.get('password');
    
    await register(email,password);
    form.reset();
    homePage();

}

async function register(email, password){

    if(password!=document.getElementById('repeatPassword').value){return console.error('Passwords don\'t match');}

    try{
        const res = await fetch('http://localhost:3030/users/register',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'},
                body: JSON.stringify({email,password})
            });
            if(!res.ok){
                const error = await res.json();
                throw new Error(error.message)}
                const user = await res.json();
                localStorage.setItem('user',JSON.stringify(user));
            }catch(err){
                alert(err.message);
                throw err;
            }
        }

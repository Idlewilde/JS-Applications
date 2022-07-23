
const section = document.getElementById('welcome');

export function homeView(){
    document.getElementById('mainContent').replaceChildren(section);
}
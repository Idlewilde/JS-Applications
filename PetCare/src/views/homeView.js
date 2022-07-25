const section = document.getElementsByClassName('welcome-content')[0];

export function homeView(){
    document.getElementById('content').replaceChildren(section);
}
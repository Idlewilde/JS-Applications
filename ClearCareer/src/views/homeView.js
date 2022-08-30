const section = document.getElementById('home');

export function homeView(){
    document.getElementById('content').replaceChildren(section);
}
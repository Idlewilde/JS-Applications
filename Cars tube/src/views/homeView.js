const section = document.getElementById('main');

export async function homeView(){
    document.getElementById('site-content').replaceChildren(section);
}
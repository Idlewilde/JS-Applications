import page from '../../node_modules/page/page.mjs'
import { editById, getById } from '../api/data.js';

const section = document.getElementById('edit');
const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);
let user=null;
let id=null;

export async function editView(ctx){
    document.getElementById('content').replaceChildren(section);
    id=ctx.params.id;
    user = JSON.parse(localStorage.getItem('user'));
    let element = await getById(id);
    section.getElementsByClassName('job-title')[0].value = element.title;
    section.getElementsByClassName('job-imageUrl')[0].value = element.imageUrl;
    section.getElementsByClassName('job-category')[0].value = element.category;
    section.getElementsByClassName('job-description')[0].value = element.description;
    section.getElementsByClassName('job-requirements')[0].value = element.requirements;
    section.getElementsByClassName('job-salary')[0].value = Number(element.salary);

}

async function onSubmit(event){
    event.preventDefault();
    const formData = new FormData(form);
    const title = formData.get('title');
    const imageUrl = formData.get('imageUrl');
    const description = formData.get('description');
    const requirements = formData.get('requirements');
    const salary = formData.get('salary');
    const category = formData.get('category');


    if (title.trim().length > 0
    && imageUrl.trim().length > 0
    && description.trim().length > 0
    &&requirements.trim().length > 0
    && category.trim().length > 0
    && salary.trim().length > 0) {

        await editById(id,{
            title,
            imageUrl, 
            category, 
            description, 
            requirements, 
            salary}
        );
        form.reset();
        page.redirect(`/details/${id}`);
    }
}
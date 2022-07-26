
import page from '../../node_modules/page/page.mjs'
import { editById, getById } from '../api/data.js';

const section = document.getElementById('edit-page');
let id = null;
const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);
let user = null;

export async function editView(ctx) {
    document.getElementById('main-content').replaceChildren(section);
    id = ctx.params.id;
    user = JSON.parse(localStorage.getItem('user'));
    let ad = await getById(id);
    section.getElementsByClassName('adtitle')[0].value = ad.title;
    section.getElementsByClassName('adimageUrl')[0].value = ad.imageUrl;
    section.getElementsByClassName('addescription')[0].value = ad.description;
    section.getElementsByClassName('adphone')[0].value = ad.phone;
    section.getElementsByClassName('adaddress')[0].value = ad.address;
}

async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(form);

    const title = formData.get('title');
    const description = formData.get('description');
    const imageUrl = formData.get('imageUrl');
    const address = formData.get('address')
    const phone = formData.get('phone');


    if (title.trim().length > 0
        && description.trim().length > 0
        && imageUrl.trim().length > 0
        && address.trim().length > 0
        && phone.trim().length > 0) {

        await editById(id, {
            title,
            description,
            imageUrl,
            address,
            phone
        }
        );
        form.reset();
        page.redirect(`/details/${id}`);
    }
}
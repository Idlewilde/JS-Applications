
import page from '../../node_modules/page/page.mjs'
import { editById, getById } from '../api/data.js';

const section = document.getElementById('edit-listing');
let id = null;
let form = section.querySelector('form');
form.addEventListener('submit', onSubmit);



export async function editView(ctx) {
    document.getElementById('site-content').replaceChildren(section);
    id = ctx.params.id;
    let car = await getById(id);
    
    document.getElementById('carBrand').value=car.brand;
    document.getElementById('carModel').value=car.model;
    document.getElementById('carDescription').value=car.description;
    document.getElementById('carYear').value=car.year;
    document.getElementById('carImageUrl').value=car.imageUrl;
    document.getElementById('carPrice').value=car.price;

    

}

async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(form);

    const brand = formData.get('brand');
    const model = formData.get('model');
    const description = formData.get('description');
    let year = formData.get('year');
    const imageUrl = formData.get('imageUrl');
    let price = formData.get('price')


    if (brand.trim().length > 0
    &&model.trim().length > 0
    && description.trim().length > 0
    && imageUrl.trim().length > 0
    && year.trim().length > 0
    && price.trim().length > 0) {
        year=Number(year);
        price=Number(price);

        await editById(id, {
            brand,
            model,
            description,
            year,
            imageUrl,
            price
          });
        form.reset();
        page.redirect(`/details/${id}`);
    }
}
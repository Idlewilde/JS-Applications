let userData=null;

window.addEventListener('DOMContentLoaded', ()=>{
    userData = JSON.parse(sessionStorage.getItem('userData'));
    if(userData!=null){
        document.getElementById('guest').style.display='none';
        document.querySelector('#addForm .add').disabled=false;
        document.getElementsByClassName('email')[0].children[0].textContent=userData.email;
    
    }
    else{
document.getElementById('user').style.display='none';
    }

    document.querySelector('.load').addEventListener('click',loadData);
    document.getElementById('addForm').addEventListener('submit',onCreateSubmit);
});

async function onCreateSubmit(event){
event.preventDefault();
if(!userData){window.location='/login.html';return;}
const formData = new FormData(event.target);
const data = [...formData.entries()].reduce((a,[k,v])=>Object.assign(a,{[k]:v}),{});
try{
const res = await fetch('http://localhost:3030/data/catches',
{method: 'post',
headers:{
    'Content-Type':'application/json',
    'X-Authorization':userData.token
},
    body:JSON.stringify(data)});
    if(res.ok!=true){
        const error = await res.json();
        throw new Error(error.message)};
        loadData();event.target.reset();
}catch(err){
    alert(err.message);
}
}

    async function loadData(){
        const res = await fetch('http://localhost:3030/data/catches');
        const data = await res.json();  
        document.getElementById('catches').replaceChildren(...data.map(createPreview))
    }

     function createPreview(item){
        const isOwner = userData&&item._ownerId==userData.id;
        const element = document.createElement('div');
        element.className='catch';
        element.innerHTML=
        `<label>Angler</label>
        <input type="text" class="angler" value="${item.angler}" ${!isOwner?'disabled':''}>
        <label>Weight</label>
        <input type="text" class="weight" value="${item.weight}" ${!isOwner?'disabled':''}>
        <label>Species</label>
        <input type="text" class="species" value="${item.species}" ${!isOwner?'disabled':''}>
        <label>Location</label>
        <input type="text" class="location" value="${item.location}" ${!isOwner?'disabled':''}>
        <label>Bait</label>
        <input type="text" class="bait" value="${item.bait}" ${!isOwner?'disabled':''}>
        <label>Capture Time</label>
        <input type="number" class="captureTime" value="${item.captureTime}" ${!isOwner?'disabled':''}>
        <button class="update" data-id="${item._id}" ${!isOwner?'disabled':''}>Update</button>
        <button class="delete" data-id="${item._id}" ${!isOwner?'disabled':''}>Delete</button>`;
        element.querySelectorAll('button')[0].addEventListener('click',updateEntry);
        element.querySelectorAll('button')[1].addEventListener('click',deleteEntry);
        return element;
    }

    async function deleteEntry(event){
        event.preventDefault;
        let id = event.target.getAttribute('data-id');
        let url = 'http://localhost:3030/data/catches/'+id;

        try{
            const res = await fetch(url,
            {method: 'delete',
            headers:{
                'Content-Type':'application/json',
                'X-Authorization':userData.token
            },
                body:null});
                if(res.ok!=true){
                    const error = await res.json();
                    throw new Error(error.message)};
                    loadData();
            }catch(err){
                alert(err.message);
            }

    }

    async function updateEntry(event){
        event.preventDefault;
        let id = event.target.getAttribute('data-id');
        let url = 'http://localhost:3030/data/catches/'+id;
        let data = {"angler": event.target.parentNode.children[1].value,
        "weight": event.target.parentNode.children[3].value,
        "species": event.target.parentNode.children[5].value,
        "location": event.target.parentNode.children[7].value,
        "bait": event.target.parentNode.children[9].value,
        "captureTime": event.target.parentNode.children[11].value}
        
        try{
            const res = await fetch(url,
            {method: 'put',
            headers:{
                'Content-Type':'application/json',
                'X-Authorization':userData.token
            },
                body:JSON.stringify(data)});
                if(res.ok!=true){
                    const error = await res.json();
                    throw new Error(error.message)};
                    loadData();
            }catch(err){
                alert(err.message);
            }

    }

   

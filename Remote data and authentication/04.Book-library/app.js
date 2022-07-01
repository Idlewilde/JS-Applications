document.getElementById('loadBooks').addEventListener('click',loadRecords);
document.getElementById('loadBooks').addEventListener('click',loadRecords);
let formChildren = document.getElementsByTagName('form')[0].children;
let createBTN=formChildren[formChildren.length-1];
createBTN.addEventListener('click',addRecord);

async function loadRecords() {
    let url = 'http://localhost:3030/jsonstore/collections/books';
    const res = await fetch(url);
    const data = await res.json();
    let books= Object.values(data);
    let tbody =document.getElementsByTagName('tbody')[0]

    tbody.replaceChildren();

    books.forEach(e=> {
        let tr = document.createElement('tr');
        tr.innerHTML+=`<td>${e.title}</td><td>${e.author}</td>`
       
        let deleteBTN = document.createElement('button');
        deleteBTN.textContent='Delete';
        deleteBTN.addEventListener('click',deleteRecord);

        let editBTN = document.createElement('button');
        editBTN.textContent='Edit';
        editBTN.addEventListener('click',editRecord);

        let td3 = document.createElement('td');
        td3.appendChild(editBTN);td3.appendChild(deleteBTN);

        tr.appendChild(td3);
        tbody.appendChild(tr);   
    })

    
}


async function deleteRecord(event){
    let title = event.target.parentNode.parentNode.children[0].textContent;
    let url = 'http://localhost:3030/jsonstore/collections/books';
        const res = await fetch(url);
        const data = await res.json();
        let id='';
        for(let element of Object.keys(data)){
            if(data[element].title==title){id=element};
        }
        
        let deleteURL = 'http://localhost:3030/jsonstore/collections/books/'+id;
        const options = {
            method: 'delete',
            headers: {
                'Content-Type':'application/json'},
                body: null
            };
        const res1 = await fetch(deleteURL,options);
        const result = await res1.json();
        loadRecords();

}
async function editRecord(event){
    let titleText = event.target.parentNode.parentNode.children[0].textContent;
    let authorText = event.target.parentNode.parentNode.children[1].textContent;
    let titleField=document.getElementsByTagName('form')[0].children[2];
    let authorField = document.getElementsByTagName('form')[0].children[4];
    titleField.value=titleText;
     authorField.value=authorText;

    let url = 'http://localhost:3030/jsonstore/collections/books';
        const res = await fetch(url);
        const data = await res.json();
        let id='';

        for(let element of Object.keys(data)){
            if(data[element].title==titleText){id=element;}
        }

        let saveBTN = document.createElement('button');
        saveBTN.textContent='Save';
        saveBTN.addEventListener('click',saveRecord);
        saveBTN.style.display='block';
        document.getElementsByTagName('form')[0].appendChild(saveBTN);
        createBTN.style.display='none';

        async function saveRecord(event){
            event.preventDefault(event);
            let data = {
                "author":authorField.value,
                "title": titleField.value 
            }

            let url = 'http://localhost:3030/jsonstore/collections/books/'+id;
    const options = {
        method: 'put',
        headers: {
            'Content-Type':'application/json'},
            body: JSON.stringify(data)
        };
    const res = await fetch(url,options);
    const result = await res.json();
    authorField.value='';
    titleField.value='';
    saveBTN.style.display='none';
    createBTN.style.display='block';
    loadRecords();
            
        }
    }

async function addRecord(event){
    event.preventDefault(event);
    
    let title=document.getElementsByTagName('form')[0].children[2];
    let author = document.getElementsByTagName('form')[0].children[4];

    let data = {
        "author":author.value,
        "title": title.value 
    }
    let url = 'http://localhost:3030/jsonstore/collections/books';
    const options = {
        method: 'post',
        headers: {
            'Content-Type':'application/json'},
            body: JSON.stringify(data)
        };
    const res = await fetch(url,options);
    const result = await res.json();
    author.value='';
    title.value=''
    loadRecords();
}

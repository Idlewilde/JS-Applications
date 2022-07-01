function attachEvents() {
    document.getElementById('btnLoad').addEventListener('click',loadRecords);
    document.getElementById('btnCreate').addEventListener('click',createRecord);
    let person = document.getElementById('person');
    let phone = document.getElementById('phone');
    let book = document.getElementById('phonebook');

    async function loadRecords() {
        let url = 'http://localhost:3030/jsonstore/phonebook';
        const res = await fetch(url);
        const data = await res.json();
        let phones= Object.values(data);

        book.replaceChildren();

        phones.forEach(e=> {
            let li = document.createElement('li');
            li.textContent=`${e.person}:${e.phone}`;
            let deleteBTN = document.createElement('button');
            deleteBTN.textContent='Delete';
            deleteBTN.addEventListener('click',deleteRecord);
            li.appendChild(deleteBTN);
            book.appendChild(li);
        })
        
    }

    async function createRecord(event){
        let data = {
            'person':person.value,
            'phone': phone.value 
        }

        

        let url = 'http://localhost:3030/jsonstore/phonebook';
        const options = {
            method: 'post',
            headers: {
                'Content-Type':'application/json'},
                body: JSON.stringify(data)
            };
        const res = await fetch(url,options);
        const result = await res.json();
        person.value='';
        phone.value=''
        loadRecords();
    }

   async function deleteRecord(event){
    let url = 'http://localhost:3030/jsonstore/phonebook';
        const res = await fetch(url);
        const data = await res.json();
        let id='';
        let contactName = event.target.parentNode.textContent.split(':')[0];
        for(let element of Object.keys(data)){
            if(data[element].person==contactName){id=element};
        }
        
        let deleteURL = 'http://localhost:3030/jsonstore/phonebook/'+id;
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



}

attachEvents();
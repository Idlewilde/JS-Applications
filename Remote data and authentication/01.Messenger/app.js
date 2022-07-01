function attachEvents() {
    document.getElementById('refresh').addEventListener('click',displayMessages);
    document.getElementById('submit').addEventListener('click',sendMessage);
    let messageArea = document.getElementById('messages');
    let name = document.getElementById('controls').children[1];
    let text = document.getElementById('controls').children[4];

    async function displayMessages(event){
        let messages = await getMessages();
        messageArea.textContent='';
        console.log(messages);
        messages.forEach(e=>messageArea.textContent+=`${e.author}: ${e.content}\n`)
    }

    async function sendMessage(event){
        let data = {
            'author':name.value,
            'content': text.value 
        }

        let url = 'http://localhost:3030/jsonstore/messenger';
        const options = {
            method: 'post',
            headers: {
                'Content-Type':'application/json'},
                body: JSON.stringify(data)
            };
        const res = await fetch(url,options);
        const result = await res.json();
        name.value='';
        text.value=''
    }
}

async function getMessages() {

    const url = 'http://localhost:3030/jsonstore/messenger';
    const res = await fetch(url);
    const data = await res.json();
    return Object.values(data);
}
attachEvents();
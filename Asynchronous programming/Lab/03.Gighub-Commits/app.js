function loadCommits() {
   let username = document.getElementById(`username`);
	let	repo=document.getElementById(`repo`);
	let	commits = document.getElementById(`commits`);
    let url=`https://api.github.com/repos/${username.value}/${repo.value}/commits`

    fetch(url)
    .then(res => {
        if (res.ok == false) {
            throw new Error(`Error: <${res.status}> (Not Found)`)
        }
        return res.json()
    })
    .then(handleResponse)
    .catch(handleError);

function handleResponse(data) {
    commits.innerHTML = '';
    console.log(data);
    for (let commit of data) {
        let liElement = document.createElement('li');
        let obj = commit.commit;
        let name =obj.author.name
        console.log(obj.message);
        liElement.innerHTML = `${name}: ${obj.message}`
        commits.appendChild(liElement);
    }
}

function handleError(error) {
    commits.innerHTML = '';
    "Error: <error.status> (Not Found)"
    let liElement = document.createElement('li');
        liElement.innerHTML = `${error.message}`
        commits.appendChild(liElement);
}
        
}
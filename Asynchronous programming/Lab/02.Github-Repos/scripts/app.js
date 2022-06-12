function loadRepos() {
	const username = document.getElementById('username').value;
	const repos = document.getElementById('repos');
	const url = `https://api.github.com/users/${username}/repos`;

	fetch(url)
		.then(res => {
			if (res.ok == false) {
				throw new Error(`${res.status} ${res.statusText}`)
			}
			return res.json()
		})
		.then(handleResponse)
		.catch(handleError);

	function handleResponse(data) {
		repos.innerHTML = '';
		for (let repo of data) {
			let liElement = document.createElement('li');
			liElement.innerHTML = `<a href="${repo.html_url}">${repo.full_name}</a>`
			console.log(repo.full_name, repo.html_url);
			repos.appendChild(liElement);
		}
	}

	function handleError(error) {
		repos.innerHTML = '';
		repos.textContent = `${error.message}`
	}
}

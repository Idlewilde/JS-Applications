function getInfo() {
    const div = document.getElementById('stopName' );
	const stopID = document.getElementById('stopId');
    const ul = document.getElementById('buses' );
	const url = `http://localhost:3030/jsonstore/bus/businfo/${stopID.value}`;

	fetch(url)
		.then(res => {
			if (res.ok == false) {
                throw new Error ('Error')
			}
			return res.json()
		})
		.then(handleResponse)
        .catch(handleError);

	function handleResponse(data) {
        let busStop = data.name;
		div.textContent = busStop;
        ul.innerHTML='';

		for (let bus in data.buses) {
			let liElement = document.createElement('li');
			liElement.innerHTML = `${bus} arrives in ${data.buses[bus]} minutes.`
			ul.appendChild(liElement);
		}
	}

    function handleError(error) {
		ul.innerHTML = '';
		div.textContent = `Error`
	}
}

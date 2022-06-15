function solve() {
    const span = document.getElementsByClassName('info')[0];
    const departBTN = document.getElementById('depart');
    const arriveBTN = document.getElementById('arrive');

    let currentStop='depot'
 
    let url = `http://localhost:3030/jsonstore/bus/schedule/${currentStop}`


    function depart() {
        url= `http://localhost:3030/jsonstore/bus/schedule/${currentStop}`
        fetch(url)
		.then(res => {
			if (res.ok == false) {
				throw new Error(`Error`)
			}
			return res.json()
		})
		.then(handleResponse)
		.catch(handleError);

        function handleResponse(data) {
            departBTN.disabled=true;
            arriveBTN.disabled=false;
            
            
            span.textContent=`Next stop ${currentStop}`;
           
        }

        function handleError(error) {
            span.textContent = 'Error';
            departBTN.disabled=true;
            arriveBTN.disabled=true;
        }


    }

    function arrive() {
        fetch(url)
		.then(res => {
			if (res.ok == false) {
				throw new Error(`Error`)
			}
			return res.json()
		})
		.then(handleResponse)
		.catch(handleError);

        function handleResponse(data) {
            url= `http://localhost:3030/jsonstore/bus/schedule/${currentStop}`
            departBTN.disabled=false;
            arriveBTN.disabled=true;
            
            span.textContent=`Arriving at ${currentStop}`;
            currentStop=data.next;
            
        }


        function handleError(error) {
            span.textContent = 'Error';
            departBTN.disabled=true;
            arriveBTN.disabled=true;
        }
    }

    return {
        depart,
        arrive
    };
}

let result = solve();
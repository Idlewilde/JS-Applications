async function lockedProfile() {
    let profiles = await getProfiles();
    let main = document.getElementById('main');
    main.replaceChildren();
    profiles.forEach(e => {
        let profile = document.createElement('div');
        profile.classList.add("profile");
        profile.innerHTML = ` <img src="./iconProfile2.png" class="userIcon" />
        <label>Lock</label>
        <input type="radio" name="user1Locked" value="lock" checked>
        <label>Unlock</label>
        <input type="radio" name="user1Locked" value="unlock"><br>
        <hr>
        <label>Username</label>
        <input type="text" name="user1Username" value="${e.username}" disabled readonly />
        <div class="user1Username" style="display:none">
            <hr>
            <label>Email:</label>
            <input type="email" name="user1Email" value="${e.email}" disabled readonly />
            <label>Age:</label>
            <input type="text" name="user1Age" value="${e.age}" disabled readonly />
        </div>`;
        let btn = document.createElement('button');
        btn.textContent = 'Show more';
        btn.addEventListener('click', toggle);
        profile.appendChild(btn);
        main.appendChild(profile);
    })

    function toggle(event) {

        if (!event.target.parentNode.children[2].checked) {
            if (event.target.textContent == 'Show more') {
                event.target.textContent = 'Hide it';
                let divToShow = event.target.parentNode.children[9];
                divToShow.style.display = 'block'
            } else {

                event.target.textContent = 'Show more';
                let divToShow = event.target.parentNode.children[9];
                divToShow.style.display = 'none'
            }
        }
    }

}

async function getProfiles() {

    const url = 'http://localhost:3030/jsonstore/advanced/profiles';
    const res = await fetch(url);
    const data = await res.json();
    return Object.values(data);
}


window.addEventListener('load',displayStudents);
document.getElementById('submit').addEventListener('click',addStudent);

async function displayStudents(event){
    let url = 'http://localhost:3030/jsonstore/collections/students';
    const res = await fetch(url);
    const data = await res.json();
    const tbody = document.getElementsByTagName('tbody')[0];
    tbody.innerHTML='';
    let students = Object.values(data);
    students.forEach(e=>{
        tbody.innerHTML+=`<tr>
        <td>${e.firstName}</td>
        <td>${e.lastName}</td>
        <td>${e.facultyNumber}</td>
        <td>${e.grade}</td>
        </tr>`
    })
}

async function addStudent(event){
    let inputFields= document.getElementsByClassName('inputs')[0].children;
    let fname = inputFields[0];
    let lname = inputFields[1];
    let fnum = inputFields[2];
    let grade = inputFields[3];

    let data = {
        "firstName":fname.value,
        "lastName":lname.value,
        "facultyNumber":fnum.value,
        "grade":grade.value
    }

    let url = 'http://localhost:3030/jsonstore/collections/students';
    const options = {
        method: 'post',
        headers: {
            'Content-Type':'application/json'},
            body: JSON.stringify(data)
        };
    const res = await fetch(url,options);
    const result = await res.json();

    fname.value='';
    lname.value='';
    fnum.value='';
    grade.value='';
    displayStudents();

}
let allUsers = [];
let filteredUsers = [];

let filteredUsersHtml = null;
let statisticsHtml = null;

let foundUsers = null;
let totalMaleUsers = null;
let totalFemaleUsers = null;

let totalAges = null;
let averageAges = null;
let seach = null;

window.addEventListener('load', () => {
    search = document.querySelector('#search');
    statisticsText = document.querySelector('#statistics');
    usersFoundText = document.querySelector('#users-found');
    statisticsHtml = document.querySelector('.statistics-users');
    filteredUsersHtml = document.querySelector('.filtered-users');

    getUsers();
});

window.addEventListener('keyup', () => filterUsers());

window.addEventListener('click', () => filterUsers());

async function getUsers() {
    const res = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo');
    const json = await res.json();

    allUsers = json.results.map(user => {
        const { login, name, dob, gender, picture } = user;

        return {
            id: login.username,
            name: `${name.first} ${name.last}`,
            age: dob.age,
            gender,
            picture: picture.thumbnail
        }
    });
}

function filterUsers() {
    let name = search.value.toLowerCase();
    filteredUsers = allUsers.filter(user => {
        return user.name.toLowerCase().includes(name);
    })
    render();
}

function render() {
    renderUsersFound();
    renderStatitics();
}

function renderUsersFound() {
    usersFoundText.textContent = `${filteredUsers.length} usuário(s) encontrado(s)`;
    let usersHtml = '';
    filteredUsers.forEach(user => {
        let userHtml = `
        <div>
        <img src=${user.picture}>
        <span>${user.name}, </span>
        <span>${user.age} anos</span>
        </div>
       `;
        usersHtml += userHtml;

    })

    filteredUsersHtml.innerHTML = usersHtml;

}

function renderStatitics() {
    totalFemaleUsers = filteredUsers.filter(user => user.gender === 'female').length;
    
    totalMaleUsers = filteredUsers.filter(user => user.gender === 'male').length;
    
    totalAges = filteredUsers.reduce((accumulator, current) => {
        return accumulator + current.age;
    }, 0);

    averageAges = totalAges / filteredUsers.length;


    statisticsText.textContent = 'Estatísticas';
    statisticsHtml.innerHTML = `
        <div>Sexo masculino: ${totalMaleUsers}</div>
        <div> Sexo feminino: ${totalFemaleUsers}</div>
        <div> Soma das idades: ${totalAges}</div>
        <div> Média das idades: ${averageAges.toLocaleString('pt-br', {maximumFractionDigits: 2})}</div>
    `;
}
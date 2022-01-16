
let _id;

let _user;

let dropdown;
let dropdownMenu;

let isAdmin;
let isEmployee;

let button;

function init() {
    dropdown = document.getElementById('dropdown')
    dropdownMenu = document.getElementById('dropdownMenu');

    isAdmin = document.getElementById('is-admin');
    isAdmin.value = 'false';
    isAdmin.addEventListener('click', () => checkboxListener(isAdmin));

    isEmployee = document.getElementById('is-employee');
    isEmployee.value = 'false';
    isEmployee.addEventListener('click', () => checkboxListener(isEmployee));

    button = document.getElementById('button');

    fetch('http://127.0.0.1:8081/admin/users').then(result => {
        result.json().then(users => {
            users.forEach(user => {
                dropdownMenu.innerHTML += `<li><button class="dropdown-item" onclick="userSelected(${user.id})">${user.username}</button></li>\n`;
            });
        });
    }).catch(err => {
        alert(err.message);
    });

    const url = document.URL.split('/');
    if (url[url.length - 2] === 'edit') {
        _id = parseInt(url[url.length - 1]);
        fetch(`http://127.0.0.1:8081/admin/authorities/${_id}`).then(result => {
           result.json().then(authority => {
               userSelected(authority.user.id);
           });
        });

        button.innerHTML = 'Save';
        button.onclick = save;
    }
}

function checkboxListener(checkbox) {
    if (checkbox.value === 'false') {
        checkbox.value = 'true';
    } else {
        checkbox.value = 'false';
    }

    console.log(checkbox.value);
    return checkbox.value;
}


function userSelected(id) {
    fetch(`http://127.0.0.1:8081/users/${id}`).then(result => {
        result.json().then(user => {
            if (user) {
                _user = user;
                document.getElementById('dropdown').innerText = _user.username;

                if (user.authority) {
                    if (user.authority.isAdmin.toString() !== isAdmin.value) {
                        isAdmin.click();
                    }
                    if (user.authority.isEmployee.toString() !== isEmployee.value) {
                        isEmployee.click();
                    }

                    button.innerText = 'Save';
                    button.onclick = save;
                } else {
                    button.innerText = 'Create';
                    button.onclick = create;
                }
            } else {
                alert('No user found!');
            }

        });
    }).catch(err => {
        alert(err.message);
    });
}

function create() {
    if (_user) {
        fetch('http://127.0.0.1:8081/admin/authorities', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                userID: _user.id,
                isAdmin: isAdmin.value === 'true',
                isEmployee: isEmployee.value === 'true',
            })
        }).then(result => {
            result.json().then(created => {
                if (created) {
                    document.location.href = 'http://127.0.0.1:8080/admin/authorities';
                }
            }).catch(err => {
                alert(err.message);
            });
        }).catch(err => {
            alert(err.message);
        });
    } else {
        alert('No user slected!');
    }
}

function save() {
    fetch('http://127.0.0.1:8081/admin/authorities', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            id: _id,
            isAdmin: isAdmin.value === 'true',
            isEmployee: isEmployee.value === 'true',
        })
    }).then(result => {
        result.json().then(created => {
            if (created) {
                document.location.href = 'http://127.0.0.1:8080/admin/authorities';
            }
        }).catch(err => {
            alert(err.message);
        });
    }).catch(err => {
        alert(err.message);
    });
}
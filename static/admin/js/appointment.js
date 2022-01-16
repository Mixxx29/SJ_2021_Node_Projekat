
let _id;
let _user;
let _employee;
let dropdownUser;
let dropdownMenuUser;
let dateTime;
let dropdownEmployee;
let dropdownMenuEmployee;
let status;
let button;

function init() {
    dropdownUser = document.getElementById('dropdownUser')
    dropdownMenuUser = document.getElementById('dropdownMenuUser');

    dateTime = document.getElementById('date-time');

    dropdownEmployee = document.getElementById('dropdownEmployee')
    dropdownMenuEmployee = document.getElementById('dropdownMenuEmployee');

    status = document.getElementById('status');

    button = document.getElementById('button');

    fetch('http://127.0.0.1:8081/admin/users').then(result => {
        result.json().then(users => {
            users.forEach(user => {
                dropdownMenuUser.innerHTML += `<li><button class="dropdown-item" onclick="userSelected(${user.id})">${user.username}</button></li>\n`;

                if (user.authority && user.authority.isEmployee) {
                    dropdownMenuEmployee.innerHTML += `<li><button class="dropdown-item" onclick="employeeSelected(${user.id})">${user.username}</button></li>\n`;
                }
            });
        });
    }).catch(err => {
        alert(err.message);
    });

    const url = document.URL.split('/');
    if (url[url.length - 2] === 'edit') {
        _id = parseInt(url[url.length - 1]);
        fetch(`http://127.0.0.1:8081/admin/appointments/${_id}`).then(result => {
            result.json().then(appointment => {
                userSelected(appointment.user.id);
                employeeSelected(appointment.employee.id);
                dateTime.value = appointment.date.split('.')[0];
                for (let i = 0; i < status.options.length; i++) {
                    if (status.options[i].text === appointment.status) {
                        status.selectedIndex = i;
                        break;
                    }
                }
            });
        });

        button.innerHTML = 'Save';
        button.onclick = save;
    }
}

function userSelected(id) {
    fetch(`http://127.0.0.1:8081/users/${id}`).then(result => {
        result.json().then(user => {
            if (user) {
                _user = user;
                dropdownUser.innerText = _user.username;
            } else {
                alert('No user found!');
            }
        });
    }).catch(err => {
        alert(err.message);
    });
}

function employeeSelected(id) {
    fetch(`http://127.0.0.1:8081/users/${id}`).then(result => {
        result.json().then(user => {
            if (user) {
                _employee = user;
                dropdownEmployee.innerText = _employee.username;
            } else {
                alert('No user found!');
            }
        });
    }).catch(err => {
        alert(err.message);
    });
}

function create() {
    fetch('http://127.0.0.1:8081/admin/appointments', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            userID: _user.id,
            date: new Date(dateTime.value),
            employeeID: _employee.id,
            status: status.options[status.selectedIndex].text
        })
    }).then(result => {
        result.json().then(created => {
            if (created) {
                document.location.href = 'http://127.0.0.1:8080/admin/appointments';
            }
        }).catch(err => {
            alert(err.message);
        });
    }).catch(err => {
        alert(err.message);
    });
}

function save() {
    fetch('http://127.0.0.1:8081/admin/appointments', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            id: _id,
            userID: _user.id,
            date: new Date(dateTime.value),
            employeeID: _employee.id,
            status: status.options[status.selectedIndex].text
        })
    }).then(result => {
        result.json().then(created => {
            if (created) {
                document.location.href = 'http://127.0.0.1:8080/admin/appointments';
            }
        }).catch(err => {
            alert(err.message);
        });
    }).catch(err => {
        alert(err.message);
    });
}
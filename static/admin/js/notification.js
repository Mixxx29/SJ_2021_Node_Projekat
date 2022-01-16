
let _id;
let _user;
let _appointment;
let dropdownUser;
let dropdownMenuUser;
let dropdownAppointment;
let dropdownMenuAppointment;
let message;
let button;

function init() {
    dropdownUser = document.getElementById('dropdownUser');
    dropdownMenuUser = document.getElementById('dropdownMenuUser');

    dropdownAppointment = document.getElementById('dropdownAppointment');
    dropdownMenuAppointment = document.getElementById('dropdownMenuAppointment');

    message = document.getElementById('message');

    button = document.getElementById('button');

    fetch('http://127.0.0.1:8081/admin/users').then(result => {
        result.json().then(users => {
            users.forEach(user => {
                dropdownMenuUser.innerHTML += `<li><button class="dropdown-item" onclick="userSelected(${user.id})">${user.username}</button></li>\n`;
            });
        });
    }).catch(err => {
        alert(err.message);
    });

    const url = document.URL.split('/');
    if (url[url.length - 2] === 'edit') {
        _id = parseInt(url[url.length - 1]);
        fetch(`http://127.0.0.1:8081/admin/notifications/${_id}`).then(result => {
            result.json().then(notification => {
                userSelected(notification.user.id);
                message.value = notification.message;
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
                dropdownUser.innerHTML = user.username;

                fetch('http://127.0.0.1:8081/admin/appointments').then(result => {
                    result.json().then(appointments => {
                        dropdownAppointment.innerHTML = 'Choose Appointment';
                        dropdownMenuAppointment.innerHTML = '';
                        appointments.forEach(appointment => {
                            if (appointment.user.username === user.username || appointment.employee.username === user.username) {
                                dropdownMenuAppointment.innerHTML += `<li><button class="dropdown-item" onclick="appointmentSelected(${appointment.id})">${appointment.id}</button></li>\n`;
                            }
                        });
                        if (dropdownMenuAppointment.innerHTML === '') {
                            dropdownAppointment.innerHTML = 'No Appointments'
                        }
                    });
                }).catch(err => {
                    alert(err.message);
                });
            } else {
                alert('No user found!');
            }
        });
    }).catch(err => {
        alert(err.message);
    });
}

function appointmentSelected(id) {
    fetch(`http://127.0.0.1:8081/admin/appointments/${id}`).then(result => {
        result.json().then(appointment => {
            if (appointment) {
                _appointment = appointment;
                dropdownAppointment.innerHTML = appointment.id;
            } else {
                alert('No user found!');
            }
        });
    }).catch(err => {
        alert(err.message);
    });
}

function create() {
    fetch('http://127.0.0.1:8081/admin/notifications', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            userID: _user.id,
            appointmentID: _appointment.id,
            message: message.value
        })
    }).then(result => {
        result.json().then(created => {
            if (created) {
                document.location.href = 'http://127.0.0.1:8080/admin/notifications';
            }
        }).catch(err => {
            alert(err.message);
        });
    }).catch(err => {
        alert(err.message);
    });
}

function save() {
    fetch('http://127.0.0.1:8081/admin/notifications', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            id: _id,
            userID: _user.id,
            appointmentID: _appointment.id,
            message: message.value
        })
    }).then(result => {
        result.json().then(created => {
            if (created) {
                document.location.href = 'http://127.0.0.1:8080/admin/notifications';
            }
        }).catch(err => {
            alert(err.message);
        });
    }).catch(err => {
        alert(err.message);
    });
}
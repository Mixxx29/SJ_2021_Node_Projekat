
function init() {
    const table = document.getElementById('table');

    fetch('http://127.0.0.1:8081/admin/appointments').then(results => {
        results.json().then(appointments => {
            let row = 0;
            appointments.forEach(appointment => {
                let dateTime = appointment.date.split('.')[0].split('T');
                let s = '';

                if (appointment.status === 'PENDING') {
                    s += '<tr class="table-warning">\n';
                } else  if (appointment.status === 'APPROVED') {
                    s += '<tr class="table-success">\n';
                } else {
                    s += '<tr class="table-danger">\n';
                }

                s += `<th scope="row">${++row}</th>\n` +
                `<td>${appointment.id}</td>\n` +
                `<td>${appointment.user.username}</td>\n` +
                `<td>${dateTime[0]}</td>\n` +
                `<td>${dateTime[1]}</td>\n` +
                `<td>${appointment.employee.username}</td>\n` +
                `<td>${appointment.status}</td>\n` +
                '<td>' +
                '<div style="display: flex; flex-direction: row; justify-content: right">' +
                `<button type="button" class="btn btn-primary" style="margin-right: 20px" onclick="edit(${appointment.id})">Edit</button>` +
                `<button type="button" class="btn btn-danger" onclick="deleteAuthority(${appointment.id})">Delete</button>` +
                '</div>' +
                '</td>' +
                '</tr>';

                table.innerHTML += s;
            });
        })
    }).catch(err => {
        alert(err.message);
    });
}

function create() {
    document.location.href = 'http://127.0.0.1:8080/admin/appointments/create';
}

function edit(id) {
    document.location.href = `http://127.0.0.1:8080/admin/appointments/edit/${id}`;
}

function deleteAuthority(id) {
    if (confirm("Are you sure you want to delete authority?")) {
        fetch(`http://127.0.0.1:8081/admin/appointments`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: id})
        }).then(result => {
            result.json().then(deleted => {
                if (deleted) {
                    document.location.href = 'http://127.0.0.1:8080/admin/appointments';
                }
            });
        });
    }
}
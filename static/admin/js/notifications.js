
function init() {
    const table = document.getElementById('table');

    fetch('http://127.0.0.1:8081/admin/notifications').then(results => {
        results.json().then(notifications => {
            let row = 0;
            notifications.forEach(notification => {
                let s = '';

                if (notification.appointment.status === 'PENDING') {
                    s += '<tr class="table-warning">\n';
                } else  if (notification.appointment.status === 'APPROVED') {
                    s += '<tr class="table-success">\n';
                } else  if (notification.appointment.status === 'DECLINED') {
                    s += '<tr class="table-danger">\n';
                }

                s += `<th scope="row">${++row}</th>\n` +
                    `<td>${notification.id}</td>\n` +
                    `<td>${notification.user.username}</td>\n` +
                    `<td>${notification.appointment.id}</td>\n` +
                    `<td>${notification.message}</td>\n` +
                    '<td>' +
                    '<div style="display: flex; flex-direction: row; justify-content: right">' +
                    `<button type="button" class="btn btn-primary" style="margin-right: 20px" onclick="edit(${notification.id})">Edit</button>` +
                    `<button type="button" class="btn btn-danger" onclick="deleteAuthority(${notification.id})">Delete</button>` +
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
    document.location.href = 'http://127.0.0.1:8080/admin/notifications/create';
}

function edit(id) {
    document.location.href = `http://127.0.0.1:8080/admin/notifications/edit/${id}`;
}

function deleteAuthority(id) {
    if (confirm("Are you sure you want to delete notification?")) {
        fetch(`http://127.0.0.1:8081/admin/notifications`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: id})
        }).then(result => {
            result.json().then(deleted => {
                if (deleted) {
                    document.location.href = 'http://127.0.0.1:8080/admin/notifications';
                }
            });
        });
    }
}

function init() {
    const table = document.getElementById('table');

    fetch('http://127.0.0.1:8081/admin/users').then(result => {
       result.json().then(users => {
           let row = 0;
           users.forEach(user => {
                let s = '';

                if (user.authority && user.authority.isAdmin) {
                    s += '<tr class="table-danger">\n';
                } else if (user.authority && user.authority.isEmployee) {
                   s += '<tr class="table-info">\n';
                } else {
                    s += '<tr>\n';
                }

                s += '<th scope="row">' + (++row) + '</th>' +
                    '<td>' + user.id + '</td>' +
                    '<td>' + user.username + '</td>' +
                    '<td>' + user.password + '</td>';

                if (user.authority) {
                    s += '<td>' + user.authority.isAdmin + '</td>' +
                        '<td>' + user.authority.isEmployee + '</td>';
                } else {
                    s += '<td> false </td>' +
                        '<td> false </td>';
                }

                s += `<td><button type="submit" class="btn btn-primary col-8" onclick="edit(${user.id})">Edit</button></td>` +
                    `<td><button type="button" class="btn btn-danger col-8" onclick="deleteUser(${user.id})">Delete</button></td>\n`;

               table.innerHTML += s;
           });
       });
    });
}

function create() {
    document.location.href = 'http://127.0.0.1:8080/admin/users/create';
}

function edit(id) {
    document.location.href = `http://127.0.0.1:8080/admin/users/edit/${id}`;
}

function deleteUser(id) {
    if (confirm("Are you sure you want to delete user?")) {
        fetch(`http://127.0.0.1:8081/admin/users`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: id})
        }).then(deleted => {
            if (deleted) {
                document.location.href = 'http://127.0.0.1:8080/admin/users';
            }
        });
    }
}

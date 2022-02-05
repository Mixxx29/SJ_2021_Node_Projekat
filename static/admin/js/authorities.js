
function init() {
    const table = document.getElementById('table');

    fetch('http://127.0.0.1:8081/admin/authorities').then(results => {
        results.json().then(authorities => {
            let row = 0;
            authorities.forEach(authority => {
                let s = '';

                if (authority.isAdmin) {
                    s += '<tr class="table-danger">\n';
                } else {
                    s += '<tr class="table-info">\n';
                }

                s += `<th scope="row">${++row}</th>\n` +
                    `<td>${authority.id}</td>\n` +
                    `<td>${authority.user.username}</td>\n` +
                    `<td>${authority.isAdmin}</td>\n` +
                    `<td>${authority.isEmployee}</td>\n` +
                    '<td>' +
                    '<div style="display: flex; flex-direction: row; justify-content: right">' +
                    `<button type="button" class="btn btn-primary" style="margin-right: 20px" onclick="edit(${authority.id})">Edit</button>` +
                    `<button type="button" class="btn btn-danger" onclick="deleteAuthority(${authority.id})">Delete</button>` +
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
    document.location.href = 'http://127.0.0.1:8000/admin/authorities/create';
}

function edit(id) {
    document.location.href = `http://127.0.0.1:8000/admin/authorities/edit/${id}`;
}

function deleteAuthority(id) {
    if (confirm("Are you sure you want to delete authority?")) {
        fetch(`http://127.0.0.1:8081/admin/authorities`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: id})
        }).then(result => {
            result.json().then(deleted => {
                if (deleted) {
                    document.location.href = 'http://127.0.0.1:8000/admin/authorities';
                }
            });
        });
    }
}
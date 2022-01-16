
let _id;
let username;
let password;
let passwordLabel;
let repeatedPassword;
let repeatedPasswordLabel;
let button;

function init() {
    username = document.getElementById('username');
    password = document.getElementById('password');
    passwordLabel =  document.getElementById('passwordLabel');
    repeatedPassword = document.getElementById('repeatedPassword');
    repeatedPasswordLabel = document.getElementById('repeatedPasswordLabel');

    button = document.getElementById('button');

    const url = document.URL.split('/');
    if (url[url.length - 2] === 'edit') {
        _id = parseInt(url[url.length - 1]);
        document.title = 'Edit User';
        fetch(`http://127.0.0.1:8081/admin/users/${_id}`).then(result => result.json().then(user => {
            if (user) {
                username.value = user.username;
                passwordLabel.innerHTML = 'Enter New Password';
                repeatedPasswordLabel.innerHTML = 'Repeat New Password';
                button.innerHTML = 'Save';
                button.onclick = save;
            }
        })).catch(err => {
            console.log(err);
        });
    }
}

function create() {
    if (password.value === repeatedPassword.value) {
        fetch('http://127.0.0.1:8081/admin/users', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: username.value,
                password: password.value
            })
        }).then(result => result.json().then(created => {
            if (created) {
                document.location.href = 'http://127.0.0.1:8080/admin/users';
            }
        }));
    }
}

function save() {
    if (password.value === repeatedPassword.value) {
        fetch('http://127.0.0.1:8081/admin/users', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: _id,
                username: username.value,
                password: password.value
            })
        }).then(result =>  {
            result.json().then(saved => {
                if (saved) {
                    document.location.href = 'http://127.0.0.1:8080/admin/users';
                }
            });
        });
    }
}
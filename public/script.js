function loading(buttonID, text) {
    let button = document.getElementById(buttonID);
    button.disabled = true;
    button.ariaBusy = true;
    button.innerHTML = text;
    return button;
}

function error(button, text='An error has occured.') {
    button.ariaBusy = false;
    button.innerHTML = text;
    buttin.id = redButton;
}

// New Message Button

function post() {
    let content = document.getElementById('content').value;
    let password = document.getElementById('password').value;
    let button = loading('sendButton', 'Sending...');

    const xhr = new XMLHttpRequest();
    xhr.open("POST", '/messages', true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader('Authorization', `Bearer ${password}`);

    xhr.onload = async () => {
        let response =  JSON.parse(xhr.response);
        if (xhr.status === 200) {
            document.getElementById('form').style = "display: none;"
            document.getElementById('linkarea').style = "";

            document.getElementById('link').value = window.location.href + response._id;
        } else if (xhr.status = 400) {
            error(button, response.error)
        } else { 
            error(button); 
        }
    }

    xhr.onerror = async () => { error(button); }

    xhr.send(JSON.stringify({ content }));
}

// Copy Link Button

function copy() {
    let link = document.getElementById('link');
    link.select();
    link.setSelectionRange(0, 99999)
    navigator.clipboard.writeText(link.value);

    let copyButton = document.getElementById('copyButton');
    copyButton.innerHTML = 'Copied!';
}

// View Message Button

function get() {
    let id = window.location.href.split('/')[3];
    let password = document.getElementById('password').value;
    let button = loading('viewButton', 'Authenticating...')
    if (!password) return error(button, "Please enter the password.")

    const xhr = new XMLHttpRequest();
    xhr.open("GET", `/messages/${id}`, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader('Authorization', `Bearer ${password}`);

    xhr.onload = async () => {
        if (xhr.status === 200) {
            document.getElementById('passwordarea').style = "display: none;"
            document.getElementById('redButton').style = "";

            let response =  JSON.parse(xhr.response);
            console.log(response);
            document.getElementById('content').innerHTML = response.content;
        } else if (xhr.status = 400) {
            error(button, response.error)
        } else { 
            error(button); 
        }
    }

    xhr.onerror = async () => { error(button); }

    xhr.send();
}

// Delete Message Button

function del() {
    let id = window.location.href.split('/')[3];
    let password = document.getElementById('password').value;
    let button = loading('redButton',  'Burning...')
    if (!password) return error(button, "Unauthorized")

    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", `/messages/${id}`, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader('Authorization', `Bearer ${password}`);

    xhr.onload = async () => {
        if (xhr.status === 200) {
            document.getElementById('content').style = "display: none;"
            document.getElementById('redButton').style = "display: none;"

            // let response =  JSON.parse(xhr.response);
            // console.log(response);
            // document.getElementById('content').innerHTML = response.content;
        } else if (xhr.status = 400) {
            error(button, response.error)
        } else { 
            error(button); 
        }
    }

    xhr.onerror = async () => { error(button); }

    xhr.send();
}
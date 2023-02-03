function post() {
    let content = document.getElementById('content').value;
    let password = document.getElementById('password').value;

    let sendButton = document.getElementById('send');
    sendButton.disabled = true;
    sendButton.ariaBusy = true;
    sendButton.innerHTML = 'Sending...';

    const xhr = new XMLHttpRequest();
    xhr.open("POST", '/messages', true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader('Authorization', `Bearer ${password}`);

    function error(text) {
        sendButton.ariaBusy = false;
        sendButton.innerHTML = text;
        sendButton.id = 'redButton';
    }

    xhr.onload = async () => {
        let response =  JSON.parse(xhr.response);
        if (xhr.status === 200) {
            document.getElementById('form').style = "display: none;"
            document.getElementById('linkarea').style = "";

            document.getElementById('link').value = window.location.href + response._id;
        } else if (xhr.status = 400) {
            error(response.error)
        } else { 
            error('An error has occured.'); 
        }
    }

    xhr.onerror = async () => {
        error('An error has occured.');
    }

    xhr.send(JSON.stringify({ content }));
}

function copy() {
    let link = document.getElementById('link');
    link.select();
    link.setSelectionRange(0, 99999)
    navigator.clipboard.writeText(link.value);

    let copyButton = document.getElementById('copyButton');
    copyButton.innerHTML = 'Copied!';
}

function get() {
    let id = window.location.href.split('/')[3];
    let password = document.getElementById('password').value;

    let viewButton = document.getElementById('viewButton');
    viewButton.disabled = true;
    viewButton.ariaBusy = true;
    viewButton.innerHTML = 'Authenticating...';

    const xhr = new XMLHttpRequest();
    xhr.open("GET", `/messages/${id}`, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader('Authorization', `Bearer ${password}`);

    function error(text) {
        viewButton.ariaBusy = false;
        viewButton.innerHTML = text;
        viewButton.id = 'redButton';
    }

    xhr.onload = async () => {
        if (xhr.status === 200) {
            document.getElementById('passwordarea').style = "display: none;"
            document.getElementById('redButton').style = "";

            let response =  JSON.parse(xhr.response);
            console.log(response);
            document.getElementById('content').innerHTML = response.content;
        } else if (xhr.status = 400) {
            error(response.error)
        } else { 
            error('An error has occured.'); 
        }
    }

    xhr.onerror = async () => {
        error('An error has occured.');
    }

    xhr.send();
}

function del() {
    let id = window.location.href.split('/')[3];
    let password = document.getElementById('password').value;

    let viewButton = document.getElementById('redButton');
    redButton.disabled = true;
    redButton.ariaBusy = true;
    redButton.innerHTML = 'Burning...';

    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", `/messages/${id}`, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader('Authorization', `Bearer ${password}`);

    function error(text) {
        redButton.ariaBusy = false;
        redButton.innerHTML = text;
    }

    xhr.onload = async () => {
        if (xhr.status === 200) {
            document.getElementById('content').style = "display: none;"
            document.getElementById('redButton').style = "display: none;"

            // let response =  JSON.parse(xhr.response);
            // console.log(response);
            // document.getElementById('content').innerHTML = response.content;
        } else if (xhr.status = 400) {
            error(response.error)
        } else { 
            error('An error has occured.'); 
        }
    }

    xhr.onerror = async () => {
        error('An error has occured.');
    }

    xhr.send();
}
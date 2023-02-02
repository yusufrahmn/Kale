function post() {
    let content = document.getElementById('content').value;
    let password = document.getElementById('password').value;

    let sendButton = document.getElementById('send');
    sendButton.disabled = true;
    sendButton.ariaBusy = true;
    sendButton.innerHTML = 'Sending...';

    const xhr = new XMLHttpRequest();
    xhr.open("POST", '/messages', true);

    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = async () => { // Call a function when the state changes.
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            document.getElementById('form').style = "display: none;"
            document.getElementById('linkarea').style = "";

            let response =  JSON.parse(xhr.response);
            document.getElementById('link').value = window.location.href + response._id;
        }
    }

    xhr.send(JSON.stringify({ content, password }));
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
    let password = document.getElementById('password').value;
}
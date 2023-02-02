function post() {
    let content = document.getElementById('content').value;
    let password = document.getElementById('password').value;

    console.log(content, password)

    let send = document.getElementById('send');
    send.disabled = true;
    send.ariaBusy = true;
    send.innerHTML = 'Sending...';
}
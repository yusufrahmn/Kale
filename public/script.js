// Loading Button

function loading(buttonID, text) {
    let button = document.getElementById(buttonID);
    button.disabled = true;
    button.ariaBusy = true;
    button.innerHTML = text;
    return button;
}

// Error Button

function error(button, text='Error') {
    button.ariaBusy = false;
    button.innerHTML = text;
    button.classList.add("redButton");
    button.disabled = false;
}

// Fade In/Out (by @Raptor007 from https://stackoverflow.com/a/20533102)

function fadeOut(elem, ms) {
  if(!elem) return;

  if(ms)  {
    var opacity = 1;
    var timer = setInterval(() => {
      opacity -= 50 / ms;
      if(opacity <= 0) {
        clearInterval(timer);
        opacity = 0;
        elem.style.display = "none";
        elem.style.visibility = "hidden";
      }
      elem.style.opacity = opacity;
      elem.style.filter = "alpha(opacity=" + opacity * 100 + ")";
    }, 50);
  } else {
    elem.style.opacity = 0;
    elem.style.filter = "alpha(opacity=0)";
    elem.style.display = "none";
    elem.style.visibility = "hidden";
  }
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
    if (!password) return error(button, "Enter Password")

    const xhr = new XMLHttpRequest();
    xhr.open("GET", `/messages/${id}`, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader('Authorization', `Bearer ${password}`);

    xhr.onload = async () => {
        let response =  JSON.parse(xhr.response);
        if (xhr.status === 200) {
            document.getElementById('passwordarea').style = "display: none;"
            document.getElementById('burnButton').style = "";

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
    let button = loading('burnButton',  'Burning...')
    if (!password) return error(button, "Unauthorized")

    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", `/messages/${id}`, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader('Authorization', `Bearer ${password}`);

    xhr.onload = async () => {
        let response =  JSON.parse(xhr.response);
        let homepage = window.location.href.split('/').slice(0,3).join('/');
        if (xhr.status === 200) {
            fadeOut(document.getElementById('burnButton'), 500)
            document.getElementById('content').classList.add('burning');
            fadeOut(document.getElementById('content'), 4000)
            setTimeout(() => { window.location.href = homepage; }, 5000)
        } else if (xhr.status = 400) {
            error(button, response.error)
        } else { 
            error(button); 
        }
    }

    xhr.onerror = async () => { error(button); }

    xhr.send();
}
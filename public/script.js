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

// Fade Out (by @Raptor007 from https://stackoverflow.com/a/20533102)

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

    fetch('/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${password}`
        },
        body: JSON.stringify({ content })
    }).then(res => {
        res.json().then(data => {
            if (res.status === 200) {
                document.getElementById('link').value = window.location.href + data._id;
                document.getElementById('form').style = "display: none;"
                document.getElementById('linkarea').style = "";
            } else if (res.status === 400) {
                error(button, data.error)
            } else {
                error(button);
            }
        })
    }).catch(err => {
        error(button)
    });
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

// Password Field

document.getElementById('password').addEventListener('keypress', (event) => {
    if (event.key === 'Enter' && document.getElementById('viewButton')) {
        document.getElementById('viewButton').click();
    }
});

// View Message Button

function get() {
    let id = window.location.href.split('/')[3];
    let password = document.getElementById('password').value;
    let button = loading('viewButton', 'Authenticating...')
    if (!password) return error(button, "Enter Password")

    fetch(`/messages/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${password}`
        }
    }).then(res => {
        res.json().then(data => {
            if (res.status === 200) {
                document.getElementById('passwordarea').style = "display: none;"
                document.getElementById('burnButton').style = "";
                document.getElementById('content').innerHTML = data.content;
            } else if (res.status == 400) {
                error(button, data.error);
            } else { 
                error(button); 
            }
        })
    }).catch(err => {
        error(button);
    })
}

// Delete Message Button

function del() {
    let id = window.location.href.split('/')[3];
    let password = document.getElementById('password').value;
    let button = loading('burnButton',  'Burning...')
    if (!password) return error(button, "Unauthorized")

    fetch(`/messages/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${password}`
        }
    }).then(res => {
        let homepage = window.location.href.split('/').slice(0,3).join('/');
        if (res.status === 200) {
            fadeOut(document.getElementById('burnButton'), 500)
            document.getElementById('content').classList.add('burning');
            fadeOut(document.getElementById('content'), 4000)
            setTimeout(() => { window.location.href = homepage; }, 5000)
        } else if (res.status = 400) {
            error(button, response.error)
        } else { 
            error(button); 
        }
    });
}
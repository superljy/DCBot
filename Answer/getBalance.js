const fetch = require('node-fetch');

let data = {
    clientKey: "820e982eb83b3c2680d8d115b131aef2"
}

// function getBalance(balance) {

// }

// let xhr = new XMLHttpRequest;
// xhr.open('POST', 'https://api.anti-captcha.com/getBalance');
// xhr.onreadystatechange = function () {
//     if (xhr.readyState == 4) {
//         if (xhr.status == 200) {
//             return xhr.responseText.balance;
//         }
//     }
// }
// xhr.send(JSON.stringify(data));

fetch(' https://api.anti-captcha.com/getBalance ', {
    method: 'POST',
    body: JSON.stringify(data)
}).then(function (res) {
    res.json()
        .then(data => {
            console.log(data);
        })
})
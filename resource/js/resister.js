"use strict";

fetch("./resource/json/user.json").then(function (resp) {
    return resp.json();
}).then(function (data) {
    console.log(data)
})
const data = { username: 'example' };

fetch('https://tienhcmus.github.io/petshop.github.io/resource/json/bill.json', {
    method: 'POST', // or 'PUT'
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
})
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
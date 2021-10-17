let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function makePromiseCall(methodType, url, async = true, data = null) {
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            console.log("State Changed Called. Ready State: " + xhr.readyState + " Status:" + xhr.status);
            if (xhr.status.toString().match('^[2][0-9]{2}$')) {
                resolve(xhr.responseText);
            } else if (xhr.status.toString().match('^[4,5][0-9]{2}$')) {
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText
                });
                console.log("XHR Failed");
            }
        }
        xhr.open(methodType, url, async);
        if (data) {
            console.log(JSON.stringify(data));
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(data));
        } else xhr.send();
        console.log(methodType + " request sent ot the server");
    });
}

const getUrl = "http://localhost:3000/employees/1";
makePromiseCall("GET", getUrl, true).then(responseText => {
        console.log("Get User Data: " + responseText);
    })
    .catch(error => console.log("GET Error Status" + JSON > stringify(error)));


const deleteUrl = "https://localhost:3000/employees/4";
makePromiseCall("DELETE", deleteUrl, false)
    .then(responseText => {
        console.log("User deleted: " + responseText)
    })
    .catch(error => console.log("DELETE Error Status: " + JSON.stringify(error)));

const postUrl = "https://localhost:3000/employees";
const empData = { "name": "Harry", "salary": "5000" };
makePromiseCall("POST", postUrl, true, empData)
    .then(responseText => {
        console.log("User Added: " + responseText)
    })
    .catch(error => console.log("POST error status: " + JSON.stringify(error)));
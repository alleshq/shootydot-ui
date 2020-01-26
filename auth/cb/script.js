function parseQuery(queryString) {
    var query = {};
    var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
}

const {code} = parseQuery(location.search);
const server = localStorage.getItem("server");

(() => {
    if (!code) return document.write("Error: OAuth Code is not specified");
    if (!server) return document.write("Error: Server is not set.");
    fetch(`${server}/auth`, {
        method: "post",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            code
        })
    }).then(res => {
        if (res.status !== 200) return document.write("Error: Something went wrong while authenticating");
        res.json().then(body => {
            const {token} = body;
            localStorage.setItem("token", token);
            location.href = "/";
        });
    }).catch(() => {
        document.write("Error: Something went wrong while authenticating");
    });
})();